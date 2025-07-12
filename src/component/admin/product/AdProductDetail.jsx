const AdProductDetail = ({product})=>{
    return(
        <div className="">
            <div>{product.id}</div>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>{product.price}</div>
            <div>{product.stock}</div>
            <div>{product.viewCount}</div>
            <div>{product.sellStatus}</div>
            <div>{product.regTime}</div>
            <div>{product.updateTime}</div>
            <div>{product.created_by}</div>
            <div>{product.modified_by}</div>
            <div>{product.brand.name}</div>
            <div>{product.deliveryInfo.delivery_yn}</div>
            <div>{product.deliveryInfo.deliveryCom}</div>
            <div>{product.category.name}</div>
        </div>
    );
}
export default AdProductDetail;