import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import RequestReferralDialog from "./RequestReferralDialog";
import { setRequested } from "@/redux/companiesSlice";

const EmployeeCard = ({ employee }) => {
    const {user} = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const {isRequested} = useSelector(store => store.companies);
    const dispatch = useDispatch();
    const requested = isRequested[employee._id] || false;

    // ✅ Update Redux on component mount
    useEffect(() => {
        const alreadyRequested = user?.referralRequested?.some(applicationId =>
            employee?.referralRequests?.includes(applicationId)
        );
        dispatch(setRequested({ employeeId: employee._id, status: alreadyRequested }));
        console.log(isRequested);
        
    }, [dispatch, user, employee]);
    return (
        <div className="flex justify-between p-2 border rounded-lg">
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{employee.fullname}</h2>
                <p className="text-gray-600">{employee.position}</p>
            </div>
            <div>
            {
                (user?._id != employee?._id) ? (
                    <Button
                        disabled={requested ||(user?._id != employee?._id)}
                        onClick={requested ? undefined : () => setOpen(true)}
                        className={`px-1 py-2 rounded-lg font-semibold transition ${requested ? "bg-[#F99002] cursor-not-allowed" : "bg-[#F99002] hover:bg-[#F99002] text-white"
                            }`}
                    >
                        {requested ? "Referral Requested" : "Request Referral"}
                    </Button>
                ) :("")
            }
            </div>
            
            <RequestReferralDialog open={open} setOpen={setOpen} employee={employee} />
        </div>
    );
};

export default EmployeeCard;