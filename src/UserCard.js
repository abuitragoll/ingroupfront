import React from 'react';
import Card from 'react-bootstrap/Card';
import ImageWithFallback from './ImageWithFallback';

function UserCard({ nombre, email, preferencias, afiliacion }) {
    const sortedPreferences = [...preferencias].sort();

    const preferencesImages = sortedPreferences.map((preferencia, index) => (
        <>
            <div key={index} className="col-6 col-md-3 px-0 py-2" style={{ textAlign: 'center' }}>
                <ImageWithFallback src={`${preferencia}.jpg`} alt={preferencia} fallbackSrc="default.jpg" />
                <div>
                    {preferencia}
                </div>
            </div>
        </>
    ));

    const emailLink = `mailto:${email}`;

    return (
        <Card className={afiliacion === "true" ? 'bg-success my-3' : 'bg-secondary my-3'}>
            <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>
                    Email: <a href={emailLink}>{email}</a>
                </Card.Text>
                <Card.Text>
                    Preferencias:
                </Card.Text>
                <div className="container">
                    <div className="row">
                        {preferencesImages}
                    </div>
                </div>
                
            </Card.Body>
        </Card>
    );
}

export default UserCard;