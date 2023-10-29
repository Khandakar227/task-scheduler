export type RequestProp = {
  name: string;
  email: string;
  contact: string;
  appointment_with: string;
  reason_of_meeting: string;
  meeting_place: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  status: "Approved" | "Declined" | "Pending";
  _id: string;
};

export type UptoType = "today"|"7days"|"30days"|"";