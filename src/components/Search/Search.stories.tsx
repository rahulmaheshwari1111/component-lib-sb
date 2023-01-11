import React from "react";
import { Story } from "@storybook/react";
import { Search, ISearchProps } from ".";

export default {
  title: "Search",
  component: Search,
};

export const Template: Story<ISearchProps> = args => <Search {...args} placeholder = 'Search here...'/>;

Template.bind({});
