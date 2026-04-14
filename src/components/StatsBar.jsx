import React from "react";

const StatsBar = ({ stats }) => {
    if (!stats) return null;

    const cards = [
        { label: "Total Tasks", value: stats.total, bg: "primary" },
        { label: "To Do", value: stats.byStatus?.["To Do"] || 0, bg: "secondary" },
        { label: "In Progress", value: stats.byStatus?.["In Progress"] || 0, bg: "warning" },
        { label: "Done", value: stats.byStatus?.["Done"] || 0, bg: "success" },
    ];

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0">Stats</h5>
            </div>
            <div className="card-body">
                <div className="row g-2 mb-2">
                    {cards.map((c) => (
                        <div key={c.label} className="col-6 col-md-3">
                            <div className={`card text-white bg-${c.bg} text-center`}>
                                <div className="card-body py-2">
                                    <h4 className="mb-0">{c.value}</h4>
                                    <small>{c.label}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {stats.mostCommonTag && (
                    <p className="mb-0 text-center">
                        <strong>Most Common Tag:</strong>{" "}
                        <span className="badge bg-info">{stats.mostCommonTag}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatsBar;
