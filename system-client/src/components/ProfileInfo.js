import { Row, Col } from "react-bootstrap";

export default function ProfileInfo({ user }) {
    return (
        <Row className="w-100">
            <Col className="p-2 col-5 col-lg-3 my-3 border-2 border-warning" style={{ borderRight: 'solid' }}>First Name</Col>
            <Col className="p-2 ps-4 col-7 col-lg-9 my-3">{user && user.firstName}</Col>

            <Col className="p-2 col-5 col-lg-3 mb-3 border-2 border-warning" style={{ borderRight: 'solid' }}>Middle Name</Col>
            <Col className="p-2 ps-4 col-7 col-lg-9 mb-3">{user && user.middleName}</Col>

            <Col className="p-2 col-5 col-lg-3 mb-3 border-2 border-warning" style={{ borderRight: 'solid' }}>Last Name</Col>
            <Col className="p-2 ps-4 col-7 col-lg-9 mb-3">{user && user.lastName}</Col>

            <Col className="p-2 col-5 col-lg-3 mb-3 border-2 border-warning" style={{ borderRight: 'solid' }}>Email</Col>
            <Col className="p-2 ps-4 col-7 col-lg-9 mb-3">{user && user.email}</Col>

            <Col className="p-2 col-5 col-lg-3 mb-3 border-2 border-warning" style={{ borderRight: 'solid' }}>Contact Number</Col>
            <Col className="p-2 ps-4 col-7 col-lg-9 mb-3">{user && user.contactNumber}</Col>
        </Row>
    );
}
