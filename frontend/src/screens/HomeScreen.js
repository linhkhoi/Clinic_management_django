import React from 'react'
import clinic1 from'../images/clinic1.jpg';
import clinic2 from'../images/clinic2.jpg';
import clinic3 from'../images/clinic3.jpg';

function HomeScreen() {
    // const dispatch = useDispatch()
    // const productList = useSelector(state => state.productList)
    // const {error, loading, products} =  productList 

    // useEffect(()=>{
    //     dispatch(listProducts())
    // },  [dispatch])

    return (
        <div class="container-fluid px-5 py-5 mx-auto">
    <h1 class="text-center text-light">Welcome to Life Care clinic</h1>
    <h4 class="text-center text-light">This is number 1 clinic in Vietnam</h4>
    <h4 class="text-center text-light">With more than 5 years of experience in medical examination and treatment, we guarantee to bring the best services to our customers.</h4>
    <div class="row">
        <img class="img-fluid col-md-4" src={clinic1} alt="123" />
        <img class="img-fluid col-md-4" src={clinic2} alt="123" />
        <img class="img-fluid col-md-4" src={clinic3} alt="123" />
    </div>
        </div>
    )
}

export default HomeScreen
