import { withRouter } from 'next/router'
const Detail = withRouter((props) => {
    console.log(props.router)
    return (
        <div>
            {/* <p>{props.router.params.id}</p> */}
            <h1>我是{props.router.query.id}详情</h1>
        </div>
    )
})


export default Detail;