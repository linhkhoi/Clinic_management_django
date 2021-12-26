import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer class="text-white text-center text-lg-start" style={{"background-color": "#23242a"}}>
    <div class="container p-4">
      <div class="row mt-4">
        <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">ABOUT CLINIC</h5>

          <p>
          This is number 1 clinic in Vietnam
          </p>

          <p>
          With more than 5 years of experience in medical examination and treatment, we guarantee to bring the best services to our customers.
          </p>

          <div class="mt-4">
            <a type="button" class="btn btn-floating btn-warning btn-lg"><i class="fab fa-facebook-f"></i></a>

            <a type="button" class="btn btn-floating btn-warning btn-lg"><i class="fab fa-dribbble"></i></a>

            <a type="button" class="btn btn-floating btn-warning btn-lg"><i class="fab fa-twitter"></i></a>
   
            <a type="button" class="btn btn-floating btn-warning btn-lg"><i class="fab fa-google-plus-g"></i></a>

          </div>
        </div>


        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">CONTACT ADDRESS</h5>
          <ul class="fa-ul" style={{"margin-left": "1.65em"}}>
            <li class="mb-3">
              <span class="fa-li"><i class="fas fa-home"></i></span><span class="ms-2">371 Nguyen Kiem, Go Vap District, Ho Chi Min City</span>
            </li>
            <li class="mb-3">
              <span class="fa-li"><i class="fas fa-envelope"></i></span><span class="ms-2">lifecare@gmail.com</span>
            </li>
            <li class="mb-3">
              <span class="fa-li"><i class="fas fa-phone"></i></span><span class="ms-2">0835511673</span>
            </li>
            <li class="mb-3">
              <span class="fa-li"><i class="fas fa-print"></i></span><span class="ms-2">0835511673</span>
            </li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase mb-4">OPEN HOURS</h5>

          <table class="table text-center text-white">
            <tbody class="font-weight-normal">
              <tr>
                <td>Monday - Friday:</td>
                <td>9 A.M - 9 P.M</td>
              </tr>
              <tr>
                <td>Weekend:</td>
                <td>9 A.M - 9 P.M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.2)"}}>
      © 2021 Copyright:
      <a class="text-white" href="https://mdbootstrap.com/">Life Care</a>
    </div>
  </footer>
    )
}

export default Footer
