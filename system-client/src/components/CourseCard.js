import { useState } from "react";
import { Card, Button } from "react-bootstrap";


export default function CourseCard({coursesData}){

  const {_id, imgLink, name, description, price} = coursesData;

    return(
    <Card rounded className="w-100 p-3 mx-auto card-height border-warning">
      <Card.Img variant="top" src={imgLink || "https://kvytechnology.com/wp-content/uploads/2024/05/image-2-2.jpg"} className="center-crop"/>
      
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price</Card.Subtitle>
        <Card.Text>{price}</Card.Text>
      </Card.Body>
      <Card.Footer className="border-warning border-2" style={{ backgroundColor: 'white' }}>
        <Button variant="warning" className="w-100 rounded-pill mt-2">Enroll</Button>
      </Card.Footer>
    </Card>
    )
}