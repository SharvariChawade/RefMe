import React, { useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import RequestReferralDialog from "./RequestReferralDialog";

const EmployeeCard = ({ employee }) => {
    const {user} = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const requested =  user?.referralRequested?.some(applicationId =>
        employee?.referralRequests?.includes(applicationId)
    );
    return (
        <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
                <h2 className="text-lg font-semibold">{employee.fullname}</h2>
                <p className="text-gray-600">{employee.position}</p>
            </div>
            {
                (user?._id != employee?._id) ? (
                    <Button
                        disabled={requested}
                        onClick={requested ? undefined : () => setOpen(true)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${requested ? "bg-[#F99002] cursor-not-allowed" : "bg-[#F99002] hover:bg-[#F99002] text-white"
                            }`}
                    >
                        {requested ? "Referral Requested" : "Request Referral"}
                    </Button>
                ) :("")
            }
            <RequestReferralDialog open={open} setOpen={setOpen} employee={employee}/>
        </div>
    );
};

export default EmployeeCard;
