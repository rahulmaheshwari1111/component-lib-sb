import React from "react";
import { Story } from "@storybook/react";
import { Body, IBodyProps } from ".";


export default {
  title: "Body",
  component: Body,
};

const Template: Story<IBodyProps> = args => <Body {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  values:'Your Text here....'
};
