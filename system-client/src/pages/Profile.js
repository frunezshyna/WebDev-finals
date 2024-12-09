import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import ProfileInfo from "../components/ProfileInfo";
import ChangePass from "../components/ChangePass";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:4000/users/details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({})
                });

                const data = await response.json();
                setUser(data.result);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <Container fluid className="p-5 mt-5 d-flex flex-column align-items-center justify-content-center w-50 shadow rounded-3 border-bottom border-3 border-warning">
            <h2 className="mb-4 rounded-2 border-bottom border-3 border-warning">Profile Info</h2>
            
            {user && <ProfileInfo user={user} />}

            <Button variant="warning" className="mt-4 w-50 rounded-pill"  onClick={() => setShowModal(true)}>Change Password</Button>

            <ChangePass showModal={showModal} setShowModal={setShowModal} />
        </Container>
    );
}
