import type { Meta, StoryObj } from "@storybook/react";

import { FileUploadWidget } from "./FileUploadWidget";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "FrontifyLib/FileUploadWidget",
  component: FileUploadWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    uploadFilesApiUrl: "/api/multi-upload",
    uploadedFilesListApiUrl: "/api/files",
  },
  argTypes: {
    onUploadSuccess: { action: "onUploadSuccess called" },
    onUploadError: { action: "onUploadError called" },
  },
} satisfies Meta<typeof FileUploadWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
  }
};