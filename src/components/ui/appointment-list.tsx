import React, { memo } from "react";
import { AppointmentTile, getTime, closestTo } from "@reapit/elements";
import { AppointmentModel } from "@/types/appointments";
import CurrentLocButton from "@/components/container/current-loc-button";
import { oc } from "ts-optchain";
import ViewDetailButton from "../container/view-detail-button";
import ETAButton from "./eta-button";
import { NextAppointment } from "@/reducers/next-appointment";

export interface AppointmentListProps {
  data: AppointmentModel[];
  nextAppointment?: NextAppointment | null;
}

export const AppointmentList = memo(
  ({ data, nextAppointment }: AppointmentListProps) => {
    const appointmentNearest = React.useMemo(() => {
      // Get all start date
      const startDatesArray = data.map(item =>
        oc<AppointmentModel>(item).start("")
      );
      // Find appointment nearest current time
      return data.find(
        item => item.start === closestTo(new Date(), startDatesArray)
      );
    }, [data]);

    const refAppointment = React.useRef<HTMLDivElement>(null);

    const [selected, setSelected] = React.useState<AppointmentModel>();

    const onSelectAppointment = (e, item) => {
      if (e.target.type !== "button") {
        if (selected && selected.id === item.id) {
          setSelected(undefined);
        } else {
          setSelected(item);
        }
      }
    };

    React.useEffect(() => {
      if (refAppointment.current) {
        refAppointment.current.scrollIntoView({
          block: "center",
          inline: "center"
        });
      }
    }, []);

    if (data.length === 0) {
      return <div className="py-8 px-3 text-center">No appointments</div>;
    }

    return (
      <div className="px-4">
        {data.map(item => {
          const line1 = oc<AppointmentModel>(item).property.line1("---");
          const line2 = oc<AppointmentModel>(item).property.line2("---");
          const line3 = oc<AppointmentModel>(item).property.line3("---");
          const line4 = oc<AppointmentModel>(item).property.line4("---");
          const postcode = oc<AppointmentModel>(item).property.postcode("---");
          const buildingName = oc<AppointmentModel>(item).property.buildingName(
            "---"
          );
          const buildingNumber = oc<AppointmentModel>(
            item
          ).property.buildingNumber("---");
          const type = oc<AppointmentModel>(item).type("---");
          const start = getTime(oc<AppointmentModel>(item).start(""));
          const end = getTime(oc<AppointmentModel>(item).end(""));

          const hightlight = selected
            ? selected.id === item.id
            : appointmentNearest && appointmentNearest.id === item.id;

          const displayETAButton =
            nextAppointment &&
            nextAppointment.id === item.id &&
            nextAppointment.attendeeHaveMobile &&
            // less than 10 minutes
            nextAppointment.durationValue <= 600;

          let renderETAButton: React.ReactNode = null;

          if (displayETAButton) {
            const tel = oc(nextAppointment)
              .attendeeHaveMobile.communicationDetails([])
              .filter(({ label }) => label === "Mobile")[0].detail;
            const name = oc(nextAppointment).attendeeHaveMobile[0].name("");

            renderETAButton = (
              <div className="mt-4 ml-4">
                <ETAButton
                  tel={tel || ""}
                  body={`Hi ${name}, I will be with you in 10 mins`}
                >
                  ETA Text
                </ETAButton>
              </div>
            );
          }
          return (
            <div
              className="mb-4"
              onClick={e => onSelectAppointment(e, item)}
              key={item.id}
              ref={hightlight ? refAppointment : null}
            >
              <AppointmentTile
                hightlight={hightlight}
                key={item.id}
                heading={line1}
              >
                <ul>
                  <li>Property Address</li>
                  <li>Building Name: {buildingName}</li>
                  <li>Building Number: {buildingNumber}</li>
                  <li>Address 1: {line1}</li>
                  <li>Address 2: {line2}</li>
                  <li>Address 3: {line3}</li>
                  <li>Address 4: {line4}</li>
                  <li>Postcode: {postcode}</li>
                  {/* <li>Contact Name: {name}</li> */}
                  <li>Start Time: {start}</li>
                  <li>End Time: {end}</li>
                  <li>Type of Appointment: {type}</li>
                </ul>
                <div className="flex">
                  <div className="mt-4 mr-4">
                    <ViewDetailButton id={item.id} />
                  </div>
                  <div className="mt-4">
                    <CurrentLocButton />
                  </div>
                  {renderETAButton}
                </div>
              </AppointmentTile>
            </div>
          );
        })}
      </div>
    );
  }
);
