import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RegattaSectionData {
  id: string;
  regattaName: string;
  regattaStartDate: Date;
  regattaEndDate: Date;
  regattaAddress: string;
  regattaContact: string;
  regattaEmail: string;
  regattaPhone: string;
}

interface RegattaPlanSectionProps {
  id: string;
  regattaSection: RegattaSectionData;
  setRegattaSectionArr: Function;
}

const RegattaPlanSection = ({
  id,
  regattaSection,
  setRegattaSectionArr,
}: RegattaPlanSectionProps) => {
  const [regattaName, setRegattaName] = useState<string>(
    regattaSection?.regattaName || ""
  );
  const [regattaAddress, setAddress] = useState<string>(
    regattaSection?.regattaAddress || ""
  );
  const [regattaContact, setContact] = useState<string>(
    regattaSection?.regattaContact || ""
  );
  const [regattaEmail, setEmail] = useState<string>(
    regattaSection?.regattaEmail || ""
  );
  const [regattaPhone, setPhone] = useState<string>(
    regattaSection?.regattaPhone || ""
  );
  const [regattaStartDate, setStartDate] = useState<Date | null>(
    regattaSection?.regattaStartDate
      ? new Date(regattaSection?.regattaStartDate)
      : null
  );
  const [regattaEndDate, setEndDate] = useState<Date | null>(
    regattaSection?.regattaEndDate
      ? new Date(regattaSection?.regattaEndDate)
      : null
  );

  useEffect(() => {
    handleSetRegattaSection();
  }, [
    regattaName,
    regattaAddress,
    regattaContact,
    regattaEmail,
    regattaPhone,
    regattaStartDate,
    regattaEndDate,
  ]);

  const handleSetRegattaSection = () => {
    setRegattaSectionArr((currentArr: RegattaSectionData[]) => {
      const filteredArr = currentArr.filter(
        (regattaSection: RegattaSectionData) => regattaSection.id !== id
      );
      return [
        ...filteredArr,
        {
          id,
          regattaName,
          regattaAddress,
          regattaContact,
          regattaEmail,
          regattaPhone,
          regattaStartDate,
          regattaEndDate,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col rounded-md p-2 bg-white shadow-md text-center tablet:text-left">
      <input
        placeholder="Type regatta name here"
        value={regattaName}
        onChange={(event) => {
          setRegattaName(event.target.value);
        }}
        className={`bg-inherit text-2xl p-2 text-center tablet:text-left ${
          regattaName ? "text-black" : ""
        }`}
      />
      <div className="flex flex-col tablet:flex-row">
        {/* Regatta Details */}
        <div className="mx-2 w-full">
          {/* Start Date */}
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="startDate">
              <h3 className="text-blue-light text-center tablet:text-left">
                Start Date
              </h3>
            </label>
            <DatePicker
              maxDate={regattaEndDate}
              isClearable
              placeholderText="Select Start Date"
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              name="startDate"
              id="startDate"
              selected={regattaStartDate}
              onChange={(date: Date) => setStartDate(date)}
              className="bg-inherit p-2 w-full text-center tablet:text-left text-black"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="endDate">
              <h3 className="text-blue-light">End Date</h3>
            </label>
            <DatePicker
              minDate={regattaStartDate}
              isClearable
              placeholderText="Select End Date"
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              name="endDate"
              id="endDate"
              selected={regattaEndDate}
              onChange={(date: Date) => setEndDate(date)}
              className="bg-inherit p-2 w-full text-center tablet:text-left text-black"
            />
          </div>
          {/* Address */}
          <div className="flex flex-col my-2">
            <label htmlFor="address">
              <h3 className="text-blue-light">Address</h3>
            </label>
            <input
              placeholder="Type address here"
              name="address"
              id="address"
              value={regattaAddress}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              className={`bg-inherit p-2 w-full text-center tablet:text-left ${
                regattaAddress ? "text-black" : ""
              }`}
            />
          </div>
        </div>
        <div className="mx-2 w-full">
          {/* Contact */}
          <div className="flex flex-col my-2">
            <label htmlFor="contact">
              <h3 className="text-blue-light">Contact Name</h3>
            </label>
            <input
              placeholder="Type contact name here"
              name="contact"
              id="contact"
              value={regattaContact}
              onChange={(event) => {
                setContact(event.target.value);
              }}
              className={`bg-inherit p-2 w-full text-center tablet:text-left ${
                regattaContact ? "text-black" : ""
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col my-2">
            <label htmlFor="email">
              <h3 className="text-blue-light">Email Address</h3>
            </label>
            <input
              placeholder="Type email address here"
              name="email"
              id="email"
              value={regattaEmail}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className={`bg-inherit p-2 w-full text-center tablet:text-left ${
                regattaEmail ? "text-black" : ""
              }`}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col my-2">
            <label htmlFor="phone">
              <h3 className="text-blue-light">Phone Number</h3>
            </label>
            <input
              placeholder="Type phone number here"
              name="phone"
              id="phone"
              value={regattaPhone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              className={`bg-inherit p-2 w-full text-center tablet:text-left ${
                regattaPhone ? "text-black" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegattaPlanSection;
