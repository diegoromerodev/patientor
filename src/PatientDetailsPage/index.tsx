import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Header, Icon, Table } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setLastPatient, useStateValue } from "../state";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";
import { HealthCheckEntryValues, HealthCheckForm, HospitalEntryForm, HospitalEntryValues, OccupationalEntryValues, OccupationalForm } from "./EntryForm";

const PatientDetailsPage = () => {
    const {id} = useParams<{id: string}>();
    const [{lastPatient}, dispatch] = useStateValue();

    const [, setModalOpen] = React.useState<boolean>(false);
    const [, setError] = React.useState<string | undefined>();

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: HealthCheckEntryValues | HospitalEntryValues | OccupationalEntryValues) => {
        try {
        const { data: newPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
        );
        dispatch({ type: "ADD_PATIENT", payload: newPatient });
        closeModal();
        } catch (e: unknown) {
            if(axios.isAxiosError(e)){
                console.error(e.response?.data || 'Unknown Error');
                setError(e.response?.data?.error || 'Unknown error');
            }
        }
    };
    const getPatient = async() => {
        try {
            const { data: singlePatient } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setLastPatient(singlePatient));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if(!lastPatient || lastPatient.id !== id) {
            void getPatient();
        }
    }, []);
    return (
        <>
            {lastPatient && (
                <div>
                    <Header size="huge">
                        {lastPatient.name}
                        <Icon size="large"
                        name={lastPatient.gender === "male" ? "man" : 
                        lastPatient.gender === "female" 
                        ? "woman": "other gender"}></Icon>
                    </Header>
                    <p>ssn: {lastPatient.ssn || "unknown"}</p>
                    <p>occupation: {lastPatient.occupation}</p>
                    <p>
                        date of birth: {lastPatient.dateOfBirth || "unknown"}
                    </p>
                    <div>
                        <h4>entries</h4>
                        <Table celled padded>
                            <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Code</Table.HeaderCell>
                                <Table.HeaderCell>Specialist</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lastPatient.entries.map(en => {
                                    return <EntryDetails key={en.id} entry={en} />;
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            )}
            <HealthCheckForm onSubmit={submitNewEntry} onCancel={closeModal}></HealthCheckForm>
            <HospitalEntryForm onSubmit={submitNewEntry} onCancel={closeModal}></HospitalEntryForm>
            <OccupationalForm onSubmit={submitNewEntry} onCancel={closeModal}></OccupationalForm>
        </>
    );
};

export default PatientDetailsPage;