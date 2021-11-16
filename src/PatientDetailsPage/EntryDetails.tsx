import React from "react";
import { Table, Header } from "semantic-ui-react";
import { Entries, HealthCheckEntry, HospitalEntry, OccupationalHealthcare } from "../types";

const HealthCheck = ({entry}: {entry: HealthCheckEntry}) => {
    return (
        <Table.Row>
            <Table.Cell singleLine>
                <Header as='h2' textAlign='center'>
                    {entry.diagnosisCodes || "None"}
                </Header>
            </Table.Cell>
            <Table.Cell singleLine>{entry.specialist}</Table.Cell>
            <Table.Cell singleLine>{entry.date}</Table.Cell>
            <Table.Cell>
                {entry.healthCheckRating}
                {entry.description}
            </Table.Cell>
        </Table.Row>
    );
};

const Hospital = ({entry}: {entry: HospitalEntry}) => {
    return (
        <Table.Row>
            <Table.Cell singleLine>
                <Header as='h2' textAlign='center'>
                    {entry.diagnosisCodes || "None"}
                </Header>
            </Table.Cell>
            <Table.Cell singleLine>{entry.specialist}</Table.Cell>
            <Table.Cell singleLine>{entry.date}</Table.Cell>
            <Table.Cell>
                {entry.discharge.criteria}
                -
                {entry.description}
            </Table.Cell>
        </Table.Row>
    );
};

const OccupationalHealth = ({entry}: {entry: OccupationalHealthcare}) => {
    return (
        <Table.Row>
            <Table.Cell singleLine>
                <Header as='h2' textAlign='center'>
                    {entry.diagnosisCodes || "None"}
                </Header>
            </Table.Cell>
            <Table.Cell singleLine>{entry.specialist}</Table.Cell>
            <Table.Cell singleLine>{entry.date}</Table.Cell>
            <Table.Cell>
                {entry.sickLeave?.startDate}
                -
                {entry.description}
            </Table.Cell>
        </Table.Row>
    );
};

const assertNever = (val: never): null => {
    throw new Error("Invalid entry " + JSON.stringify(val));
};

const EntryDetails = ({entry}: {entry: Entries}) => {
    switch(entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealth entry={entry} />;
        default:
            assertNever(entry);
            return null;
    }
};

export default EntryDetails;