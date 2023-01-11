import React from "react";
import { Story } from "@storybook/react";
import { Textarea, ITextAreaProps } from ".";


export default {
  title: "Textarea",
  component: Textarea,
};

const Template: Story<ITextAreaProps> = args => <Textarea {...args} />;

export const FullWidth = Template.bind({});
FullWidth.args = {
    id: 'full-width',
  fullwidth:true,
  invalid:false
};

export const invalid = Template.bind({});
invalid.args = {
    id: 'invalid',
  invalid:true,
  fullwidth:false
};
