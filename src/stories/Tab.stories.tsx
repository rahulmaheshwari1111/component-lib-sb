import React from "react";
import { Story } from "@storybook/react";
import { Tab, ITabProps } from "../components/Tab";

export default {
  title: "Tab",
  component: Tab,
};
const tabData = [
    {
      label: 'Schedule',
      content: <p> schedule </p>,
      icon: 'fa-calendar',
      viewOnMobile: true,
    },
    {
      label: 'Content',
      content: <p> content </p>,
      icon: 'fa-file',
    },
    {
      label: 'Participants',
      content: <p> participants </p>,
      icon: 'fa-users',
    },
    {
      label: 'Reports',
      content:<p> report </p>,
      icon: 'fa-file',
    
    },
    {
        label: 'Discussions',
        content:<p> Discussions </p>,
        icon: 'fa-comments',
      
      },
]

export const Template: Story<ITabProps> = args => <Tab {...args}  data = {tabData}/>;

Template.bind({});
