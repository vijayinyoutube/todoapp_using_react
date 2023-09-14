import { Checkbox, Divider, Input, List, Modal, Typography } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const localDataKey = "TO_DO_LIST";

function InputComp() {
  const [items, setItems] = useState<any>([]);
  const [completed, setIsCompleted] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputTextVal, setInputText] = useState();
  const [oldVal, setOldVal] = useState<any>();

  // - - - Function to add data to local storage - - -
  const addData = (value) => {
    const temp = [...items, value];
    setItems(temp.filter((element) => element));
    console.log(temp);
    localStorage.setItem(
      localDataKey,
      JSON.stringify(temp.filter((element) => element))
    );
  };

  // - - -  - - - - - - - - - - - - - - - - - - - - - -

  const getData = () => {
    localStorage.getItem(localDataKey);
  };

  // - - -  - - - - - - DELETE DATA - - - - - - - - - - -
  const deleteData = (value: String) => {
    localStorage.removeItem(localDataKey);

    const temp = items;
    const deletedList = temp.filter(function (letter) {
      return letter !== value;
    });

    setItems(deletedList);
    console.log(deletedList);
    localStorage.setItem(
      localDataKey,
      JSON.stringify(deletedList.filter((element) => element))
    );
  };
  // - - -  - - - - - - - - - - - - - - - - - - - - - -

  // - - -  - - - - - - COMPLETE DATA - - - - - - - - - - -
  const completeData = (value) => {
    console.log("Index - ", value);

    const tempVal = [...completed, value];
    console.log("tempVal - ", tempVal);
    setIsCompleted(tempVal);
    console.log("Completed - ", completed);
  };
  // - - -  - - - - - - - - - - - - - - - - - - - - - -

  // - - -  - - - - - - EDIT DATA - - - - - - - - - - -

  const handleTxtChange = (event, index) => {
    // console.log("value-", event.target.value);
    console.log("REplacing Element index: ", event.target.value);
    setInputText(event.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (val) => {
    console.log("index-", val);
    let temp = items;
    console.log("inputTxt", inputTextVal);
    let i = temp.indexOf(oldVal);
    temp[i] = inputTextVal;
    console.log("NEW", temp);
    //  - - Replace logic here - - -
    localStorage.setItem(localDataKey, JSON.stringify(temp));
    // - - - - - - - - - - - - - - -
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editData = (value) => {
    // Add replace logic
    console.log("Edting..:", value);
    setOldVal(value);
    showModal();
  };
  // - - -  - - - - - - - - - - - - - - - - - - - - - -
  return (
    <>
      <Search
        placeholder="Add your notes"
        allowClear
        enterButton="Add"
        size="large"
        onSearch={(value) => addData(value)}
      />
      <List
        bordered
        dataSource={items}
        renderItem={(itemVal: string, index: number) => (
          <>
            <List.Item
              actions={[
                <span>
                  <Checkbox onChange={() => completeData(index)}></Checkbox>
                </span>,
                <>
                  {completed.some((item) => item === index) ? (
                    <></>
                  ) : (
                    <>
                      <Modal
                        title="Enter new data to replace..."
                        open={isModalOpen}
                        onOk={(e) => handleOk(index)}
                        okText="Edit"
                        onCancel={handleCancel}
                      >
                        <Input
                          placeholder="your notes..."
                          onChange={(e) => handleTxtChange(e, index)}
                        />
                      </Modal>
                      <a
                        key="list-loadmore-edit"
                        style={{ padding: "20px" }}
                        onClick={() => editData(itemVal)}
                      >
                        <EditOutlined />
                      </a>
                    </>
                  )}
                  <a
                    key="list-loadmore-more"
                    onClick={() => deleteData(itemVal)}
                  >
                    <DeleteOutlined style={{ color: "red" }} />
                  </a>
                  ,
                </>,
              ]}
            >
              {completed.some((item) => item === index) ? (
                <Typography.Text mark>
                  <span style={{ textDecoration: "line-through" }}>
                    {itemVal}
                  </span>
                </Typography.Text>
              ) : (
                <Typography.Text>
                  <span>{itemVal}</span>
                </Typography.Text>
              )}{" "}
            </List.Item>
          </>
        )}
      />
    </>
  );
}

export default InputComp;
