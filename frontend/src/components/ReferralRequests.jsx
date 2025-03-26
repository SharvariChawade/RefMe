import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge';

const allAppliedJobs = [{ "status": "pending" }];
const ReferralRequests = ({ allReferralRequests }) => {
    const getdateformat=(datestring) => {
        const date = new Date(datestring);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const year = String(date.getFullYear()).slice(-2); 
        return `${day}/${month}/${year}`
    }
    return (
        <div>
            {
                allReferralRequests.length <= 0 ? <div className='mx-2 my-2 px-2 py-2'><h1>You haven't requested referrals yet</h1></div> :
                    (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Requests Recieved</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    allReferralRequests.map((application) => (
                                        <TableRow key={application?._id}>
                                            <TableCell>{getdateformat(application?.createdAt)}</TableCell>
                                            <TableCell>{application?.applicant?.fullname}</TableCell>
                                            <TableCell>{application?.applicant?.profile?.company?.name}</TableCell>
                                            <TableCell className="text-right"><Badge className={`${application?.status === "rejected" ? 'bg-red-400' : application?.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{application.status.toUpperCase()}</Badge></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    )
            }

        </div>
    )
}

export default ReferralRequests