import React from 'react'

const Message = () => {
  return (
    <>
       <section className="mb-20 bg-white rounded-3xl shadow-xl overflow-hidden px-6 md:px-12 py-10 max-w-6xl mx-auto">
                <div className="pb-6 border-b border-gray-200 bg-blue-50 rounded-t-3xl px-4 sm:px-6 pt-4">
                  <h2 className="text-4xl text-center font-bold text-blue-800">
                    Chairman's Message
                  </h2>
                </div>
    
                <div className="pt-10 flex flex-col md:flex-row gap-10 items-start">
                  {/* Avatar */}
                  <div className="md:w-1/3 text-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 mx-auto shadow-lg border-4 border-blue-100">
                      <img
                        src='https://i.imgur.com/kh6BEPT.jpeg'
                        alt="Krishna Kumar Upreti"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-5">
                      <h3 className="font-semibold text-xl">Krishna Kumar Upreti</h3>
                      <p className="text-sm text-gray-600">ChairMan</p>
                      {/* <span className="inline-block mt-3 px-4 py-1 border rounded-full text-sm border-gray-400 text-gray-700">
                        Ph.D. in Educational Leadership
                      </span> */}
                    </div>
                  </div>
    
                  {/* Message */}
                  <div className="md:w-2/3 space-y-5 text-[1.1rem] leading-8 text-gray-800">
                    <p className='text-justify leading-relaxed'>
                      As ChairMan, I’m honored to lead our esteemed institution. Our focus is on nurturing every student academically, emotionally, and socially. With dedicated faculty and supportive parents, we’re committed to excellence and holistic development. Together, let’s make this year one of growth, achievement, and positive impact.
                    </p>
                    <p className='text-justify leading-relaxed'>
                      I encourage all students to embrace new opportunities, challenge themselves, and strive for their personal best. With determination and perseverance, we can create a vibrant learning community where each individual can shine.
                    </p>
                      <p className='text-justify leading-relaxed'>
                     We believe that education must be deeply connected with human culture and values. Without culture and discipline, an individual remains incomplete and directionless. Therefore, we emphasize nurturing every child with strong cultural values and discipline before imparting academic knowledge. By integrating these principles, we aim to shape children into skillful, responsible, and productive members of society.
                    </p>
                    <p>
                     Best regards,
                    </p>
                    <p className="font-medium text-blue-800">
                      Krishna Kumar Upreti  <br />
                      ChairMan, Bhagawati School
                    </p>
                  </div>
                </div>
              </section>
    </>
  )
}

export default Message