import { useState } from "react";

interface RegattaPlanSectionProps {
  id: string;
  section: string;
}

const RegattaPlanSection = ({}: RegattaPlanSectionProps) => {
  const [regattaName, setRegattaName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  return (
    <div className="flex flex-col border border-black rounded-md p-2">
      <input
        placeholder={!regattaName ? "Type Regatta Name Here" : regattaName}
        onChange={(event) => {
          setRegattaName(event.target.value);
        }}
        className={`bg-inherit text-2xl p-2 ${regattaName ? "text-black" : ""}`}
      />
      {/* Regatta Details */}
      <div className="mx-2">
        <div className="flex flex-col my-2">
          <label htmlFor="address">
            <h3 className="text-blue-light">Address</h3>
          </label>
          <input
            placeholder="Type address here"
            name="address"
            id="address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            className={`bg-inherit p-2 w-full ${address ? "text-black" : ""}`}
          />
        </div>

        {/* Contact */}
        <div className="flex flex-col my-2">
          <label htmlFor="contact">
            <h3 className="text-blue-light">Contact Name</h3>
          </label>
          <input
            placeholder="Type contact name here"
            name="contact"
            id="contact"
            value={contact}
            onChange={(event) => {
              setContact(event.target.value);
            }}
            className={`bg-inherit p-2 w-full ${contact ? "text-black" : ""}`}
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
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className={`bg-inherit p-2 w-full ${email ? "text-black" : ""}`}
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
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            className={`bg-inherit p-2 w-full ${phone ? "text-black" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default RegattaPlanSection;
