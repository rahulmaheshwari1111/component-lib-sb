import React from "react";
import { Story } from "@storybook/react";
import {DropDownComponent, IDropDownComponentProps } from "./index";


export default {
  title: "DropDown",
  component: DropDownComponent,
};
const reasonOptions = [
    {
      id: 0,
      label: 'Tuberculosis',
      value:
        'Your content contains sensitive information. Please remove all sensitive information before submitting again.',
    },
    {
      id: 1,
      label: 'Diabities',
      value:
        'Your content is unrelated to the session topic. Please make sure you are uploading the correct content.',
    },
    {
      id: 2,
      label: 'Cardio-vascular diseases',
      value:
        'Your content is missing information or incomplete. Please proofread your content before submitting again.',
    },
    {
      id: 3,
      label: 'Ailments problem',
      value:
        'Your content contains typos, grammar errors, or other minor mistakes. Please proofread your content before submitting again.',
    },
  ]

const Template: Story<IDropDownComponentProps> = args => <DropDownComponent {...args} />;

export const SimpleDropDown = Template.bind({});
SimpleDropDown.args = {
    items:reasonOptions,
    isFilterable:false,
    formattedOption:val => val.label,
    selectionType:"singleSelect",
    // formikValuesCallback={handleDropDownChange}
    formattedSelectedLabel:"label"
};

export const SearchableDropDown = Template.bind({});
SearchableDropDown.args = {
    items:reasonOptions,
    isFilterable:true,
    formattedOption:val => val.label,
    selectionType:"singleSelect",
    // formikValuesCallback={handleDropDownChange}
    formattedSelectedLabel:"label"
};

export const MultiSelectDropDown = Template.bind({});
MultiSelectDropDown.args = {
    items:reasonOptions,
    isFilterable:false,
    formattedOption:val => val.label,
    selectionType:"multiSelect",
    // formikValuesCallback={handleDropDownChange}
    formattedSelectedLabel:"label"
};