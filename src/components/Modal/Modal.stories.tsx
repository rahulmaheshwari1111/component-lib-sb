import React from "react";
import { Story } from "@storybook/react";
import { Modal, IModelProps} from ".";



export default {
  title: "Modal",
  component: Modal,
};

const Template: Story<IModelProps> = args => <Modal {...args} />;

export const basic = Template.bind({});
basic.args = {
  children:<><h2>Your Content goes here.....</h2> <input/></>
};

