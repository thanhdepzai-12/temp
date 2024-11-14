import React, { useContext, useEffect, useState } from "react";
import "./ProfileCv.scss";
import { DatePicker, Space, Select, notification } from "antd";
import { getDistrict, getProvinces, getWard } from "../../../utils/apiServices";
import unidecode from "unidecode";
import { ArrowRightOutlined } from "@ant-design/icons";
import moment from "moment";
import { Contact } from "../../Context/GlobalContext";

const FillingDetail = (props) => {
  const { setCheckSidebar,nextPage, setNextPage } = props;
  const { dataUpLoad, setDataUpLoad } = useContext(Contact);
  const options = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];


  const getStored = JSON.parse(localStorage.getItem("userContact"));
  useEffect(() => {
    if (getStored) {
      if (getStored.length > 0) {
        getStored.map((items) => {
          setName(items.name);
          setPostion(items.position);
          setBirth(moment(items.birth));
          setBirthString(items.birthString);
          setGender(items.gender);
          setNumber(items.number);
          setEmail(items.email);
          setAdrressProvince(items.addressProvince);
          setAdrressDistric(items.addressDistrict);
          setAdrressWard(items.addressWard);
          return null;
        });
      }
    }
  }, []);
  const { contact, setContact } = useContext(Contact);
  const [getData, setGetData] = useState([]);
  const [name, setName] = useState(""); // Khởi tạo với chuỗi rỗng
  const [position, setPostion] = useState("");
  const [birth, setBirth] = useState(""); // Hoặc bạn có thể sử dụng null nếu muốn
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addressProvince, setAdrressProvince] = useState("");
  const [addressDistrict, setAdrressDistric] = useState("");
  const [addressWard, setAdrressWard] = useState("");
  const [checkInput, setCheckInput] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [optionsData, setOptionsData] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [birthString, setBirthString] = useState();
  const [district, setDistric] = useState([]);
  const [optionsDistrict, setOptionsDistric] = useState([]);
  const [districtId, setDistrictId] = useState();
  const [ward, setWard] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const [storedData, setStoredData] = useState([]);
  //setContact to MainCv

  useEffect(() => {
    // Kiểm tra xem có bất kỳ trường nào là rỗng hoặc null
    const dataToMainCv = {
      name,
      position,
      birthString,
      gender,
      email,
      number,
      addressProvince,
      addressDistrict,
      addressWard,
    };

    setContact(dataToMainCv);
    setDataUpLoad(dataToMainCv)
  }, [
    name,
    position,
birth,
    gender,
    email,
    number,
    addressProvince,
    addressDistrict,
    addressWard,
  ]);

  //call api
  //call API PROVINCES
  useEffect(() => {
    const fetchAllProvinces = async () => {
      const res = await getProvinces();
      if (res && res.results) {
        setProvinces(res.results);
      }
    };
    fetchAllProvinces();
  }, []);
  useEffect(() => {
    if (provinces) {
      const option = provinces.map((items) => ({
        id: items.province_id,
        label: items.province_name,
        value: items.province_name,
      }));
      if (option) {
        setOptionsData(option);
      }
    }
  }, [provinces]);

  //call API DISTRIC
  useEffect(() => {
    const fetchAllDistrict = async () => {
      const res = await getDistrict(provinceId);
      if (res && res.results) {
        setDistric(res.results);
      }
    };
    fetchAllDistrict();
  }, [provinceId]);
  useEffect(() => {
    if (district) {
      const option = district.map((items) => ({
        id: items.district_id,
        label: items.district_name,
        value: items.district_name,
      }));
      if (option) {
        setOptionsDistric(option);
      }
    }
  }, [district]);

  //call API WARD
  useEffect(() => {
    const fetchAllDistrict = async () => {
      const res = await getWard(districtId);
      if (res && res.results) {
        setWard(res.results);
      }
    };
    fetchAllDistrict();
  }, [districtId]);
  useEffect(() => {
    if (ward) {
      const option = ward.map((items) => ({
        label: items.ward_name,
        value: items.ward_name,
      }));
      if (option) {
        setOptionsWard(option);
      }
    }
  }, [ward]);

  const hasEmptyFields = (fields) => {
    return fields.some((field) => !field); // Kiểm tra nếu bất kỳ trường nào là null, undefined, hoặc chuỗi rỗng
  };

  //service
  const handleNextPage = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Danh sách tất cả các trường cần kiểm tra
    const fields = [
      name,
      position,
      birth,
      gender,
      email,
      number,
      addressProvince,
      addressDistrict,
      addressWard,
    ];

    // Kiểm tra xem có bất kỳ trường nào là rỗng hoặc null
    const hasErrors = hasEmptyFields(fields);

    if (hasErrors) {
      // Hiển thị thông báo lỗi nếu có trường nào rỗng
      notification.error({
        message: "Error Filling",
        description: "Some Information was missing",
      });
      setCheckInput(false);
    } else {
      const newData = {
        name,
        position,
        birth,
        birthString,
        gender,
        email,
        number,
        addressProvince,
        addressDistrict,
        addressWard,
      };

      // Ghi đè giá trị mới lên giá trị cũ trong localStorage
      localStorage.setItem("userContact", JSON.stringify([newData]));
      setNextPage(false);
      setCheckInput(true);
      setCheckSidebar(true);
    }
  };

  const handleChange = (values) => {
    if (values) {
      setGender(values);
    } else {
      setGender("Have no Gender");
    }
  };
  const filterOption = (input, option) => {
    const inputNormalized = unidecode(input.toLowerCase());
    const optionLabelNormalized = unidecode(option.label.toLowerCase());
    return optionLabelNormalized.includes(inputNormalized);
  };

  //antd select
  const handleChangeProvince = (values, data) => {
    if ((values, data)) {
      setAdrressProvince(values);
      setProvinceId(data.id);
    }
  };
  const handleChangeDistric = (values, data) => {
    if ((values, data)) {
      setAdrressDistric(values);
      setDistrictId(data.id);
    }
  };
  const handleChangeWard = (values, data) => {
    if ((values, data)) {
      setAdrressWard(values);
    }
  };
  const onSelectDate = (date, dateString) => {
    if (date && dateString) {
      setBirth(date);
      setBirthString(dateString);
    } else {
      setBirth(null);
      setBirthString(null);
    }
  };

  return (
    <>
      <form className="Main-info d-flex flex-column">
        <label className={checkInput === true ? "" : "error"} htmlFor="name">
          Name
        </label>
        <input
          className={checkInput === true ? "input-df" : "input-error"}
          placeholder={
            checkInput === true ? "Domic Toreto" : "cannot be left blank"
          }
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          id="name"
          value={name}
        />
        <label
          htmlFor="position"
          className={checkInput === true ? "mt-2" : "error  mt-2"}
        >
          Position
        </label>
        <input
          className={checkInput === true ? "input-df" : "input-error"}
          placeholder={checkInput === true ? "Leader" : "cannot be left blank"}
          onChange={(e) => {
            setPostion(e.target.value);
          }}
          type="text"
          id="position"
          value={position}
        />
        <div className="d-flex mt-2 gap-3">
          <div className="DateInput d-flex flex-column">
            <label className={checkInput === true ? "" : "error"}>Birth</label>
            <DatePicker
              value={birth}
              onChange={onSelectDate}
              format={"DD/MM/YYYY"}
              style={{
                color: "#064420",
                width: "208px",
                height: "38.78px",
                fontSize: "1rem",
                border: "0.2px solid green",
                borderRadius: "5px",
                padding: "0.5rem",
              }}
            />
          </div>
          <div className="Gender d-flex flex-column">
            <label className={checkInput === true ? "" : "error"}>Gender</label>
            <Select
              value={gender}
              placeholder={"Gender"}
              style={{
                color: "#064420",
                width: "120px",
                height: "38.78px",
                fontSize: "1rem",
                border: "0.2px solid green",
                borderRadius: "5px",
                padding: "0.5rem",
              }}
              onChange={handleChange}
              options={options}
            />
          </div>
        </div>
        <fieldset className="border fs mt-1 border-1 rounded-3 px-3 ">
          <legend className="float-none lg w-auto px-2 d-flex gap-1 align-items-center">
            Contact
          </legend>
          <div className="main-input">
            <div className="d-flex flex-column">
              <label className={checkInput === true ? "" : "error"}>
                Phone Number
              </label>
              <input
                className={checkInput === true ? "input-df" : "input-error"}
                placeholder={
                  checkInput === true ? "0987687554" : "cannot be left blank"
                }
                value={number}
                onChange={(e) => {
                      const value = e.target.value;

                      // Kiểm tra xem giá trị có phải là một số và không vượt quá 11 ký tự
                      if (/^\d*$/.test(value) && value.length <= 11) {
                        setNumber(value);
                      }
                }}
                type="number"
                id="position"
              />
            </div>
            <div className="d-flex mt-2 flex-column">
              <label className={checkInput === true ? "lb" : "error"}>
                Email
              </label>
              <input
                className={checkInput === true ? "input-df" : "input-error"}
                placeholder={
                  checkInput === true
                    ? "example@gmail.com"
                    : "cannot be left blank"
                }
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="position"
              />
            </div>
            <div className="d-flex mt-2 flex-column">
              <label className={checkInput === true ? "" : "error"}>
                Address
              </label>
              <div className="d-flex gap-2">
                <Select
                  value={addressProvince}
                  showSearch
                  placeholder={"Provinces/City"}
                  filterOption={filterOption}
                  style={{
                    color: "#064420",
                    width: "160px",
                    height: "38.78px",
                    fontSize: "0.8rem",
                    border: "0.2px solid green",
                    borderRadius: "5px",
                    padding: "0.5rem",
                  }}
                  onChange={handleChangeProvince}
                  options={optionsData}
                />
                <Select
                  value={addressDistrict}
                  showSearch
                  placeholder={"District"}
                  filterOption={filterOption}
                  style={{
                    color: "#064420",
                    width: "160px",
                    height: "38.78px",
                    fontSize: "0.8rem",
                    border: "0.2px solid green",
                    borderRadius: "5px",
                    padding: "0.5rem",
                  }}
                  onChange={handleChangeDistric}
                  options={optionsDistrict}
                />
              </div>
              <Select
                value={addressWard}
                showSearch
                placeholder={"Ward"}
                filterOption={filterOption}
                className="mt-3"
                style={{
                  color: "#064420",
                  width: "316px",
                  height: "38.78px",
                  fontSize: "0.8rem",
                  border: "0.2px solid green",
                  borderRadius: "5px",
                  padding: "0.5rem",
                }}
                onChange={handleChangeWard}
                options={optionsWard}
              />
            </div>
          </div>
        </fieldset>
        <span className="btn-next my-2" onClick={(e) => handleNextPage(e)}>
          <ArrowRightOutlined className="icon-next" />
        </span>
      </form>
      <></>
    </>
  );
};

export default FillingDetail;
