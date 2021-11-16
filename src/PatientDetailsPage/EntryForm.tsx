import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcare } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HealthCheckEntryValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthCheckEntryValues) => void;
  onCancel: () => void;
}

export const HealthCheckForm = ({ onSubmit, onCancel } : Props ) => {
  return (
    <Formik
      initialValues={{
       type: "HealthCheck",
       description: "",
       date: "",
       specialist: "",
       healthCheckRating: HealthCheckRating["Healthy"]
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Entry description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Entry date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Entry specialist in charge"
              name="specialist"
              component={TextField}
            />
            <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export type HospitalEntryValues = Omit<HospitalEntry, "id">;

interface HospitalProps {
  onSubmit: (values: HospitalEntryValues) => void;
  onCancel: () => void;
}

export const HospitalEntryForm = ({ onSubmit, onCancel } : HospitalProps ) => {
  return (
    <Formik
      initialValues={{
       type: "Hospital",
       description: "",
       date: "",
       specialist: "",
       discharge: {
           date: "",
           criteria: ""
       }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date) {
          errors.discharge = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Entry description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Entry date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Entry specialist in charge"
              name="specialist"
              component={TextField}
            />
            <Field
                label="Discharge date"
                name="discharge.date"
                placeholder="Date of discharge"
                component={TextField}
            />
            <Field
                label="Discharge criteria"
                name="discharge.criteria"
                placeholder="Criteria for discharge"
                component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export type OccupationalEntryValues = Omit<OccupationalHealthcare, "id">;

interface OccuProps {
  onSubmit: (values: OccupationalEntryValues) => void;
  onCancel: () => void;
}

export const OccupationalForm = ({ onSubmit, onCancel } : OccuProps ) => {
  return (
    <Formik
      initialValues={{
       type: "OccupationalHealthcare",
       description: "",
       date: "",
       specialist: "",
       employerName: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Entry description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Entry date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Entry specialist in charge"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer"
              placeholder="Employer name"
              name="employer"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
