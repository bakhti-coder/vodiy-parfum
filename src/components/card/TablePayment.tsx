import Image from "next/image";

const TablePayment = ({ cart, status }: any) => {

  return (
    <div>
      <div className="flex flex-col mt-10">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Rasmi
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nomi
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Narxi
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Soni
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Holati
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {cart?.map((el:any) => (
                  <tr key={el._id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <Image src={el?.product?.image?.url} width={50} height={100} alt='img' />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{el?.product?.title}</td>
                    <td className="whitespace-nowrap px-6 py-4">{el?.product?.price}</td>
                    <td className="whitespace-nowrap px-6 py-4">{el?.quantity}</td>
                    <td className={`whitespace-nowrap px-6 py-4 text-green-900 font-bold ${status === 'ACCEPTED' && 'text-black' || status === 'SUCCESS' && 'text-green-900' || status === 'CANCELED' && 'text-red-800'}`}>{status === 'ACCEPTED' && 'Buyurtma yuborildi' || status === 'SUCCESS' && 'Yetkazildi' || status === 'CANCELED' && 'Buyurtma bekor qilindi'}</td>
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePayment;
