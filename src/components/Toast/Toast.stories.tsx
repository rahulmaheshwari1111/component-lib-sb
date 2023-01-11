import React from "react";
import { Story } from "@storybook/react";
import { Toast, IToastProps } from ".";


export default {
  title: "Toast",
  component: Toast,
};

const Template: Story<IToastProps> = args => <Toast {...args} />;

export const basic = Template.bind({});
basic.args = {
    id: 1,
  color: 'basic',
  dismissTime: 8000,
  content:'text here or your message!!'
};

