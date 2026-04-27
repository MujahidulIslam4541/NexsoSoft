import Image from 'next/image';

export default function Stats() {
  return (
    <section className="bg-white @container pt-10 md:pt-16 border-t border-slate-200">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="space-y-6">
          <h2 className="text-balance text-4xl font-semibold md:text-5xl tracking-tight text-slate-900 font-outfit">
            Building Modern Software for Your Success
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            We help companies grow by creating reliable, easy-to-use digital
            products that solve real business problems.
          </p>
        </div>

        <div className="@xl:grid-cols-3 mt-16 grid gap-12 text-sm">
          <div className="border-t border-slate-200 pt-8">
            <p className="text-slate-600 text-lg">
              <span className="text-slate-900 font-semibold block text-3xl mb-1">
                50+
              </span>{' '}
              Projects completed and delivered.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <p className="text-slate-600 text-lg">
              <span className="text-slate-900 font-semibold block text-3xl mb-1">
                15+
              </span>{' '}
              Happy clients from around the world.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <p className="text-slate-600 text-lg">
              <span className="text-slate-900 font-semibold block text-3xl mb-1">
                Top Rated
              </span>{' '}
              Trusted by our partners daily.
            </p>
          </div>
        </div>
      </div>

      {/* World map — removed dark:opacity-30, increased brightness */}
      <div className="mask-radial-from-65% mask-radial-at-bottom mask-radial-[50%_100%] relative mx-auto max-w-5xl mt-16 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1723307060937-b003478a2c03?q=80&w=2928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="global technology map representation"
          className="grayscale brightness-95 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-400/20 cursor-crosshair"
          width={2928}
          height={1464}
        />
      </div>

      {/* 
      <div className="relative mx-auto max-w-2xl mt-16 flex justify-center overflow-hidden">
        <div className="mask-radial-from-50% mask-radial-at-bottom">
          <CobeGlobe />
        </div>
      </div> */}
    </section>
  );
}















      // <div className="mask-radial-from-65% mask-radial-at-bottom mask-radial-[50%_100%] relative mx-auto max-w-5xl mt-16 overflow-hidden">
      //   <Image
      //     src="https://images.unsplash.com/photo-1723307060937-b003478a2c03?q=80&w=2928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      //     alt="global technology map representation"
      //     className="grayscale brightness-95 transition-all duration-700 hover:scale-[1.03] cursor-crosshair"
      //     width={2928}
      //     height={1464}
      //   />
      // </div>