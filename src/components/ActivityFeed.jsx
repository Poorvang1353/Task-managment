import React from "react";

const ActivityFeed = ({ activities }) => {
    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleString();
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-info text-white">
                <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body p-0">
                {activities.length === 0 ? (
                    <p className="text-muted text-center py-3 mb-0">No activity yet</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {activities.map((a) => (
                            <li key={a._id} className="list-group-item py-2">
                                <small className="text-muted d-block">{formatTime(a.createdAt)}</small>
                                <span>{a.message}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;
