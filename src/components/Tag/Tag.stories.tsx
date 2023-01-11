import React from "react";
import { Story } from "@storybook/react";
import { Tag, ITagProps } from ".";


export default {
  title: "Tag",
  component: Tag,
};

const Template: Story<ITagProps> = args => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
   content:'Primary',
   type: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
   content:'Secondary',
   type: 'secondary'
};
export const Pending = Template.bind({});
Pending.args = {
   content:'Pending',
   type: 'pending'
};

export const Danger = Template.bind({});
Danger.args = {
   content:'Danger',
   type: 'danger'
};
export const Roles = Template.bind({});
Roles.args = {
   content:'roles',
   type: 'roles'
};
export const Success = Template.bind({});
Success.args = {
   content:'Success',
   type: 'success'
};