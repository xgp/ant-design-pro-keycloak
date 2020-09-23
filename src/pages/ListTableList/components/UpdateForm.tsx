import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    desc: props.values.desc,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="target" label="Monitoring object">
            <Select style={{ width: '100%' }}>
              <Option value="0">Table I</Option>
              <Option value="1">Table II</Option>
            </Select>
          </FormItem>
          <FormItem name="template" label="Rule template">
            <Select style={{ width: '100%' }}>
              <Option value="0">Rule template I</Option>
              <Option value="1">Rule template II</Option>
            </Select>
          </FormItem>
          <FormItem name="type" label="Rule type">
            <RadioGroup>
              <Radio value="0">Strong</Radio>
              <Radio value="1">Weak</Radio>
            </RadioGroup>
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <FormItem
            name="time"
            label="Start time"
            rules={[{ required: true, message: 'Please choose a start time!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Choose a start time"
            />
          </FormItem>
          <FormItem name="frequency" label="Scheduling period">
            <Select style={{ width: '100%' }}>
              <Option value="month">Month</Option>
              <Option value="week">Week</Option>
            </Select>
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="Rule name"
          rules={[{ required: true, message: 'Please enter a rule name!' }]}
        >
          <Input placeholder="Please enter" />
        </FormItem>
        <FormItem
          name="desc"
          label="Rule description"
          rules={[
            {
              required: true,
              message: 'Please enter a rule description of at least 5 characters!',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="Please enter at least 5 characters" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Previous
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancel</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Next
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Previous
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancel</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Carry on
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancel</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Next
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Rule configuration"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="Basic information" />
        <Step title="Configure rule properties" />
        <Step title="Set scheduling period" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.name,
          desc: formVals.desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
