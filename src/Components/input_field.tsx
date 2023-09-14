import { Alert, Checkbox, Divider, Input, List, Modal, Typography } from "antd";
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
  const [edit, setEdit] = useState(false);

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
  const deleteData = (value: String, index: number) => {
    localStorage.removeItem(localDataKey);
    console.log("Delete Index", index);
    const temp = items;
    const deletedList = temp;
    deletedList[index] = "-";
    setItems([...deletedList]);
    console.log("deletedList", deletedList);
    localStorage.setItem(localDataKey, JSON.stringify(deletedList));
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
    let temp = items;
    let i = temp.indexOf(oldVal);
    temp[i] = inputTextVal;
    //  - - Replace logic here - - -
    localStorage.setItem(localDataKey, JSON.stringify(temp));
    // - - - - - - - - - - - - - - -
    setIsModalOpen(false);
    setEdit(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEdit(false);
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
            {itemVal === "-" ? (
              <>{getData()}</>
            ) : (
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
                          {inputTextVal || !edit ? (
                            <></>
                          ) : (
                            <Alert message="This is required" type="error" />
                          )}
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
                      onClick={() => deleteData(itemVal, index)}
                    >
                      <DeleteOutlined style={{ color: "red" }} />
                    </a>
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
            )}
          </>
        )}
      />
    </>
  );
}

export default InputComp;
