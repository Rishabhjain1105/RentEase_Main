import { ContactIcon } from "lucide-react"
import React from "react"

const ExpandedDetails = ({ contact, tStatus, isOccupied, onEdit, onAssign, onRemove }) => (
  <div className="w-full bg-gray-50 rounded-b-lg border border-t-0 border-gray-100 p-4">
    <div className="flex flex-col space-y-4">
      {/* Contact Info */}
      <div className="space-y-3">
        {contact && (
          <ContactInfo  text={contact} />
        )}
        {tStatus && (
          <ContactInfo  text={tStatus} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
        {isOccupied ? (
          <>
            <ActionButton
              variant="danger"
              onClick={onRemove}
              label="Remove Tenant"
            />
            <ActionButton
              variant="primary"
              onClick={onEdit}
              label="Edit Room"
            />
          </>
        ) : (
          <ActionButton
            variant="success"
            onClick={onAssign}
            label="Assign Tenant"
          />
        )}
      </div>
    </div>
  </div>
)

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <ContactIcon type={icon} />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
)

// const ActionButton = ({ variant, onClick, label }) => {
//   const colors = {
//     danger: 'text-red-600 hover:bg-red-50',
//     primary: 'text-blue-600 hover:bg-blue-50',
//     success: 'text-green-600 hover:bg-green-50'
//   }

// //   return (
// //     <button
// //       className={`px-4 py-2 text-sm font-medium ${colors[variant]} rounded-lg transition-colors`}
// //       onClick={(e) => {
// //         e.stopPropagation();
// //         onClick();
// //       }}
// //     >
// //       {label}
// //     </button>
// //   )
// }

export default ExpandedDetails 