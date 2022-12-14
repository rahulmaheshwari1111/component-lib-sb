import React from "react";
import { Story } from "@storybook/react";
import { Heading, IHeadingProps } from "../components/Heading";


export default {
  title: "Heading",
  component: Heading,
};

const Template: Story<IHeadingProps> = args => <Heading {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
  children: "This is heading 1",
  type: "h1",
};
export const Heading2= Template.bind({});
Heading2.args = {
  children: "This is heading 2",
  type: "h2",
};
export const Heading3 = Template.bind({});
Heading3.args = {
  children: "This is heading 3",
  type: "h3",
};
export const Heading4 = Template.bind({});
Heading4.args = {
  children: "This is heading 4",
  type: "h4",
};

export const Heading5 = Template.bind({});
Heading5.args = {
  children: "This is heading 5",
  type: "h5",
};
