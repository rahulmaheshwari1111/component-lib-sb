import React from "react";
import { Story } from "@storybook/react";
import { Breadcrumb, IBreadcrumbProps } from ".";


export default {
  title: "Breadcrumb",
  component: Breadcrumb,
};

const Template: Story<IBreadcrumbProps> = args => <Breadcrumb {...args} />;

export const Example = Template.bind({});
Example.args = {
  items:[{title:'Home'},{title:'Program'},{title:'Batch'}]
};
