import React from 'react';
import { Entry } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Hospital: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{entry.date}<Icon name='hospital' /></Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
    </Card>
  )
}

const HealthCheck: React.FC<{ entry: any }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{entry.date}<Icon name='doctor' /></Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Icon name='heart' color={entry.healthCheckRating === 0 ? 'green' 
          : entry.healthCheckRating === 1 ? 'yellow' 
          : entry.healthCheckRating === 2 ? 'orange'
          : 'red'} 
        />
      </Card.Content>
    </Card>
  )
}

const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{entry.date}<Icon name='hospital' /> OCC</Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
    </Card>
  )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />
    case "HealthCheck":
      return <HealthCheck entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />
    default:
      return assertNever(entry);
  }
}

export default EntryDetails