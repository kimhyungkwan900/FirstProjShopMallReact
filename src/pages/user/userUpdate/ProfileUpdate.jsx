import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../component/common/Context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileUpdatePage = () => {

    // 변수 지정
    const { user, setUser } = useContext(UserContext);
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    // 프로필 기본값
    const [profile, setProfile] = useState({
        nickname: '',
        profileImgUrl: '',
        // delivAddress: ''
    });

    // 비밀번호 기본값
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // 불러올 값지정 없다면 null
    useEffect(() => {
        if (user) {
            setProfile({
                nickname: user.nickname || '',
                profileImgUrl: user.profileImgUrl || '',
                // delivAddress: user.delivAddress || ''
            });
        }
    }, [user]);

    // profile set
    const onProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // password set JSON 기준 target name: value 값
    const onPasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    // file = target의 file
    const onImageUpload = async (e) => {
        const file = e.target.files[0];

        // file 이 없다면 return
        if (!file) return;

        // FormData() 브라우저 내장 객체 Key-Value 형태로 저장하고 서버로 전송
        const formData = new FormData();
        // file 에 file 을 담아서 전송
        formData.append("file", file);

        try {
            // post로 formData 를 upload
            const res = await axios.post("http://localhost:8080/api/members/upload", formData, {
                headers: {
                    // 요청 헤더에 형식 명시
                    "Content-Type": "multipart/form-data",
                },
            });
            // Profile 기존 ImgUrl 을 응답받은 data.imageUrl 로 변경
            setProfile((prev) => ({
                ...prev,
                profileImgUrl: res.data.imageUrl,
            }));
        } catch (err) {
            console.error("이미지 업로드 실패", err);
            alert("이미지 업로드에 실패했습니다.");
        }
    };

    const onSubmit = async () => {
        if (!user || !token) {
            alert("로그인이 필요합니다. 다시 로그인 해주세요.");
            return;
        }

        // 닉네임 빈칸방지
        if (!profile.nickname) {
            alert("닉네임은 필수 입력 항목입니다.");
            return;
        }

        // 비밀번호 조건 검사
        if (passwords.newPassword) {
            if (passwords.newPassword.length < 8) {
                alert("새 비밀번호는 최소 8자 이상이어야 합니다.");
                return;
            }
            if (passwords.newPassword !== passwords.confirmPassword) {
                alert("새 비밀번호와 확인이 일치하지 않습니다.");
                return;
            }
            if (!passwords.currentPassword) {
                alert("비밀번호를 변경하려면 현재 비밀번호를 입력하세요.");
                return;
            }
        }

        try {
            // 프로필 업데이트
            const profileRes = await axios.put("/api/members/profile", {
                memberId: user.id,
                ...profile
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            const newAccessToken = profileRes.data.accessToken;
                if (newAccessToken) {
                    // accessToken 저장 및 이후 요청에서 사용
                    localStorage.setItem("accessToken", newAccessToken);
                }

            // 이후 요청에서도 새로운 토큰 사용
            const effectiveToken = newAccessToken || token;


            // 비밀번호 변경 요청
            if (passwords.newPassword) {
                await axios.put("/api/members/password", {
                    id: user.id,
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                }, {
                    headers: {
                        Authorization: `Bearer ${effectiveToken}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
            }

            // 사용자 정보 재요청
            const meRes = await axios.get("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${effectiveToken}`,
                },
                withCredentials: true
            });
            setUser(meRes.data);

            alert("회원 정보가 업데이트되었습니다.");

            navigate("/mypage");

        } catch (e) {
            console.error("업데이트 실패:", e);
            alert(e?.response?.data?.message || "업데이트에 실패했습니다.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-8">
            <h2 className="text-xl font-bold">회원 정보 수정</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">닉네임</label>
                    <input className="w-full border rounded p-2" name="nickname" value={profile.nickname} onChange={onProfileChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium">프로필 이미지 업로드</label>
                    <input type="file" accept="image/*" className="w-full border rounded p-2" onChange={onImageUpload} />
                    {profile.profileImgUrl && (
                        <img src={profile.profileImgUrl} alt="프로필" className="mt-2 w-32 h-32 object-cover rounded-full border" />
                    )}
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">비밀번호 변경</h3>
                <div>
                    <label className="block text-sm font-medium">현재 비밀번호</label>
                    <input className="w-full border rounded p-2" name="currentPassword" type="password" value={passwords.currentPassword} onChange={onPasswordChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium">새 비밀번호</label>
                    <input className="w-full border rounded p-2" name="newPassword" type="password" value={passwords.newPassword} onChange={onPasswordChange} />
                </div>
            <div>
                <label className="block text-sm font-medium">비밀번호 확인</label>
                <input className="w-full border rounded p-2" name="confirmPassword" type="password" value={passwords.confirmPassword} onChange={onPasswordChange} />
            </div>
        </div>
        <button className="w-full bg-black text-white py-2 rounded" onClick={onSubmit}> 저장하기 </button>
        </div>
    );
};

export default ProfileUpdatePage;
