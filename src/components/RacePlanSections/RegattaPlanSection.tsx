import { useState } from "react";

interface RegattaSectionData {
  id: string;
  regattaName: string;
  regattaAddress: string;
  regattaContact: string;
  regattaEmail: string;
  regattaPhone: string;
}

interface RegattaPlanSectionProps {
  id: string;
  section: string;
  setRegattaSectionArr: Function;
}

const RegattaPlanSection = ({
  id,
  setRegattaSectionArr,
}: RegattaPlanSectionProps) => {
  const [regattaName, setRegattaName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSetRegattaSection = () => {
    setRegattaSectionArr((currentArr: RegattaSectionData[]) => {
      let newArr = [];
      const foundRegattaSection = currentArr.find(
        (regattaSection) => regattaSection.id === id
      );
      if (foundRegattaSection) {
        const filteredArr = currentArr.filter(
          (regattaSection) => regattaSection.id !== id
        );

        newArr = [
          ...filteredArr,
          {
            id,
            regattaName,
            regattaAddress: address,
            regattaContact: contact,
            regattaEmail: email,
            regattaPhone: phone,
          },
        ];
      } else {
        newArr = [
          ...currentArr,
          {
            id,
            regattaName,
            regattaAddress: address,
            regattaContact: contact,
            regattaEmail: email,
            regattaPhone: phone,
          },
        ];
      }
      console.log(newArr);
      return newArr;
    });
  };

  return (
    <div className="flex flex-col border border-black rounded-md p-2">
      <input
        placeholder="Type regatta name here"
        onChange={(event) => {
          setRegattaName(event.target.value);
          handleSetRegattaSection();
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
              handleSetRegattaSection();
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
              handleSetRegattaSection();
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
              handleSetRegattaSection();
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