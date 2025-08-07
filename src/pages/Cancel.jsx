// client/src/pages/Cancel.jsx
const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled ❌</h2>
        <p className="text-lg">Your transaction was cancelled.</p>
      </div>
    </div>
  );
};

export default Cancel;
