import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge';

const allAppliedJobs = [{ "status": "pending" }];
const ReferralRequests = () => {
  return (
    <div>
        <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Job Role</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                                    <TableRow key="5678">
                                        <TableCell>12/03/25</TableCell>
                                        <TableCell>Analyst</TableCell>
                                        <TableCell>TIAA</TableCell>
                                        <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
    </div>
  )
}

export default ReferralRequests