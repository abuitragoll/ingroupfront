import React from 'react';
import Card from 'react-bootstrap/Card';

function UserCard({ nombre, email, preferencias, afiliacion }) {

    const sortedPreferences = [...preferencias].sort();

    const preferencesImages = sortedPreferences.map((preferencia, index) => (
        <Card.Img  key={index} src={`imagen_${preferencia}.png`} alt={preferencia} />
    ));

    const emailLink = `mailto:${email}`;

    return (
        <Card className={afiliacion === "true" ? 'bg-success' : 'bg-secondary'}>
            <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>
                    <a href={emailLink}>{email}</a>
                </Card.Text>
                {preferencesImages}
            </Card.Body>
        </Card>
    );
}

export default UserCard;