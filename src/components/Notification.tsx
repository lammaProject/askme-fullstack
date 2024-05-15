"use client";

import { useDashboard } from "@/app/_providers/store.provider";
import { Notify } from "@/store/store.interface";

const Notification = ({ notify }: { notify: Notify }) => {
  const notifyContext = useDashboard((store) => store.notify);

  return (
    (notify.open || notifyContext.open) && (
      <div className="toast toast-start">
        <div className={"alert " + (notify.type || notifyContext.type)}>
          <span>{notify.message || notifyContext.message}</span>
        </div>
      </div>
    )
  );
};

export default Notification;
