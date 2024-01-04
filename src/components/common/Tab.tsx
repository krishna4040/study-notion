type tabData = {
    id: number;
    tabName: string;
    type: string;
}

interface props {
    tabData: Array<tabData>;
    field: string;
    setField: React.Dispatch<React.SetStateAction<string>>
}

export default function Tab({ tabData, field, setField }: props) {
    return (
        <div
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="flex p-1 my-6 rounded-full bg-richblack-800 gap-x-1 max-w-max"
        >
            {tabData.map((tab) => (
                <button
                    type="button"
                    key={tab.id}
                    onClick={() => setField(tab.type)}
                    className={`${field === tab.type
                        ? "bg-richblack-900 text-richblack-5"
                        : "bg-transparent text-richblack-200"
                        } py-2 px-5 rounded-full transition-all duration-200`}
                >
                    {tab?.tabName}
                </button>
            ))}
        </div>
    );
}
