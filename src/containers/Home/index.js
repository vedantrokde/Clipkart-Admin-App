import React from 'react'
import Layout from '../../components/Layout'
import { Container } from 'react-bootstrap'

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout sidebar>
        <Container style={{marginTop: '5rem'}} className="text-center">
            <h1>Welcome to Admin Dashboard!</h1>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et consectetur neque. Etiam venenatis vitae nulla ac dictum. Curabitur hendrerit quis odio auctor finibus. Ut mi metus, lobortis sed erat sit amet, varius ullamcorper tortor. Vivamus vitae justo massa. Phasellus vel dapibus tellus. Donec imperdiet vitae velit quis euismod. Pellentesque vel faucibus risus, sit amet ornare elit.</p>
        </Container>
    </Layout>
   )

 }

export default Home