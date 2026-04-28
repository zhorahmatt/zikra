"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { isMorningTime } from "@/lib/progress";
import { CATEGORIES } from "@/lib/dzikr";

/* ── Category visual config: only design-system tokens ──────────────────── */
// Each category's icon accent (inactive state only — active always uses primary)
const ICON_ACCENTS: Record<string, string> = {
  "morning-dhikr":     "var(--primary-green)",
  "evening-dhikr":     "var(--primary-green)",
  "daily-dua":         "var(--primary-green)",
  "selected-dua":      "var(--primary-green)",
  "dhikr-after-salah": "var(--primary-green)",
};


/* ── Category Icons ─────────────────────────────────────────────────────── */
function CategoryIcon({ slug, color }: { slug: string; color: string }) {
  switch (slug) {
    case "morning-dhikr":
      return (
        <svg width="28" height="28" viewBox="0 0 64 64" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path d="m32 37a1 1 0 0 0 1-1v-6a1 1 0 0 0 -2 0v6a1 1 0 0 0 1 1z"/>
          <path d="m22.4658 36.5957a1 1 0 0 0 1.8477-.7656l-1.148-2.7715a1 1 0 1 0 -1.8476.7656z"/>
          <path d="m8.0581 48.165 2.772 1.1485a1 1 0 0 0 .7656-1.8477l-2.772-1.1484a1 1 0 0 0 -.7656 1.8476z"/>
          <path d="m52.7876 49.39a.9991.9991 0 0 0 .3823-.0761l2.772-1.1485a1 1 0 0 0 -.7656-1.8476l-2.772 1.1484a1 1 0 0 0 .3833 1.9238z"/>
          <path d="m40.8345 33.0586-1.148 2.7714a1 1 0 0 0 1.8477.7656l1.1479-2.7715a1 1 0 0 0 -1.8476-.7656z"/>
          <path d="m16.4438 42.8574a1 1 0 0 0 1.4141-1.414l-4.2427-4.2422a1 1 0 0 0 -1.414 1.414z"/>
          <path d="m51.7988 37.2012a.9994.9994 0 0 0 -1.414 0l-4.2427 4.2422a1 1 0 1 0 1.4141 1.414l4.2426-4.2422a.9994.9994 0 0 0 0-1.414z"/>
          <path d="m60 56h-11.0507a16.9775 16.9775 0 0 0 -33.8986 0h-11.0507a1 1 0 0 0 0 2h56a1 1 0 0 0 0-2zm-42.9493 0a14.9815 14.9815 0 0 1 29.8986 0z"/>
          <path d="m55 61h-46a1 1 0 0 0 0 2h46a1 1 0 0 0 0-2z"/>
          <path d="m50.5 27a13.5 13.5 0 1 0 -13.5-13.5 13.5155 13.5155 0 0 0 13.5 13.5zm0-25a11.5 11.5 0 1 1 -11.5 11.5 11.5128 11.5128 0 0 1 11.5-11.5z"/>
          <circle cx="50.5" cy="5.002" r="1"/><circle cx="50.5" cy="21.999" r="1"/><circle cx="42" cy="13.5" r="1"/><circle cx="59" cy="13.5" r="1"/><circle cx="43.14" cy="9.252" r="1"/><circle cx="57.86" cy="17.75" r="1"/><circle cx="46.25" cy="20.862" r="1"/><circle cx="54.75" cy="6.14" r="1"/><circle cx="43.14" cy="17.75" r="1"/><circle cx="57.86" cy="9.252" r="1"/><circle cx="54.75" cy="20.862" r="1"/><circle cx="46.25" cy="6.14" r="1"/>
          <path d="m49.6426 14.0146 2 3.3335a1 1 0 1 0 1.7148-1.0293l-1.8574-3.0958v-4.723a1 1 0 0 0 -2 0v5h.017a.9729.9729 0 0 0 .1256.5146z"/>
        </svg>
      );
    case "evening-dhikr":
      return (
        <svg width="28" height="28" viewBox="0 0 523.393 523.393" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path d="m253.254 303.905c4.662 0 8.442-3.78 8.442-8.442v-50.651c0-4.662-3.78-8.442-8.442-8.442s-8.442 3.78-8.442 8.442v50.651c.001 4.663 3.78 8.442 8.442 8.442z"/>
          <path d="m172.768 300.492c1.785 4.307 6.723 6.352 11.03 4.567s6.352-6.723 4.567-11.03l-9.691-23.396c-1.752-4.321-6.675-6.403-10.995-4.651-4.321 1.752-6.403 6.675-4.651 10.995.016.04.032.079.049.118z"/>
          <path d="m51.141 398.158 23.401 9.695c4.307 1.785 9.246-.26 11.03-4.567s-.26-9.246-4.567-11.03l-23.401-9.695c-4.321-1.752-9.243.331-10.995 4.651-1.733 4.275.285 9.148 4.532 10.946z"/>
          <path d="m428.74 408.499c1.108 0 2.204-.218 3.227-.642l23.401-9.695c4.293-1.818 6.3-6.772 4.482-11.065-1.798-4.247-6.671-6.264-10.945-4.532l-23.401 9.695c-4.307 1.785-6.351 6.724-4.566 11.031 1.307 3.154 4.386 5.21 7.802 5.208z"/>
          <path d="m327.834 270.633-9.691 23.396c-1.785 4.307.26 9.246 4.567 11.03s9.246-.26 11.03-4.567l9.69-23.396c1.752-4.321-.331-9.243-4.652-10.995-4.273-1.733-9.146.284-10.944 4.532z"/>
          <path d="m121.932 353.352c3.346 3.247 8.691 3.166 11.937-.181 3.177-3.275 3.177-8.481 0-11.756l-35.816-35.812c-3.353-3.239-8.698-3.146-11.937.207-3.16 3.271-3.16 8.458 0 11.73z"/>
          <path d="m420.392 305.604c-3.293-3.296-8.635-3.299-11.931-.005-.002.002-.004.004-.005.005l-35.816 35.812c-3.346 3.247-3.427 8.591-.181 11.937 3.247 3.346 8.591 3.427 11.937.181.061-.059.122-.12.181-.181l35.815-35.812c3.296-3.293 3.299-8.635.005-11.931-.001-.003-.003-.004-.005-.006z"/>
          <path d="m385.869 447.416c-13.947-73.241-84.627-121.308-157.868-107.36-54.427 10.365-96.996 52.933-107.36 107.36z"/>
          <path d="m489.625 464.3h-472.741c-4.662 0-8.442 3.78-8.442 8.442s3.78 8.442 8.442 8.442h472.742c4.662 0 8.442-3.78 8.442-8.442-.001-4.663-3.78-8.442-8.443-8.442z"/>
          <path d="m447.416 506.509h-388.323c-4.662 0-8.442 3.78-8.442 8.442s3.78 8.442 8.442 8.442h388.323c4.662 0 8.442-3.78 8.442-8.442 0-4.663-3.78-8.442-8.442-8.442z"/>
          <path d="m409.428 211.045c58.279 0 105.523-47.244 105.523-105.523s-47.244-105.522-105.523-105.522-105.523 47.244-105.523 105.523 47.244 105.522 105.523 105.522zm-62.142-61.203c-4.662 0-8.442-3.78-8.442-8.442s3.78-8.442 8.442-8.442 8.442 3.78 8.442 8.442c0 4.663-3.78 8.442-8.442 8.442zm142.339-44.319c0 4.662-3.78 8.442-8.442 8.442s-8.442-3.78-8.442-8.442 3.78-8.442 8.442-8.442c4.663 0 8.442 3.779 8.442 8.442zm-18.055-44.32c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442 3.78-8.442 8.442-8.442zm0 71.756c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442c0-4.663 3.78-8.442 8.442-8.442zm-26.264-98.02c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442 3.779-8.442 8.442-8.442zm0 124.284c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442c0-4.663 3.779-8.442 8.442-8.442zm-35.878-133.898c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442 3.78-8.442 8.442-8.442zm-8.442 37.989c0-4.662 3.78-8.442 8.442-8.442s8.442 3.78 8.442 8.442v39.872l15.68 26.133c2.399 3.997 1.104 9.183-2.893 11.583-3.997 2.399-9.183 1.104-11.583-2.893l-16.884-28.141c-.787-1.312-1.203-2.814-1.204-4.344zm8.442 105.522c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442 3.78-8.442 8.442-8.442zm-35.878-133.897c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442 3.78-8.442 8.442-8.442zm0 124.284c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442c0-4.663 3.78-8.442 8.442-8.442zm-26.264-98.02c4.662 0 8.442 3.78 8.442 8.442s-3.78 8.442-8.442 8.442-8.442-3.78-8.442-8.442 3.78-8.442 8.442-8.442zm-18.055 44.32c0-4.662 3.78-8.442 8.442-8.442s8.442 3.78 8.442 8.442-3.78 8.442-8.442 8.442c-4.663 0-8.442-3.78-8.442-8.442z"/>
        </svg>
      );
    case "daily-dua":
      return (
        <svg width="28" height="28" viewBox="0 0 64 64" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path d="m18.24049 35.80208c-1.60319-1.29728-4.13912-1.5769-4.79037-3.64279-.5328-1.88945-1.1621-4.64293-1.88528-6.88722-.902-2.28755-4.2619-5.20947-6.66554-3.38218a2.52675 2.52675 0 0 0 -.8863 2.18974 50.6003 50.6003 0 0 0 1.77507 10.28485c1.18117 4.71125 2.73254 9.49672 6.05993 12.58969a27.2124 27.2124 0 0 0 3.27267 2.61346 1.95962 1.95962 0 0 1 .88092 1.78625l-.23 3.34006a1.00007 1.00007 0 0 0 1.99524.13667l.22951-3.33415c.28992-3.1147-2.95973-4.0778-4.787-6.00724-2.98555-2.77135-4.42191-7.34761-5.52769-11.79763a48.21186 48.21186 0 0 1 -1.67877-9.81315.51219.51219 0 0 1 .67575-.55575c3.58136.86155 3.62163 5.56227 4.52384 8.15882.20423.75982.29042 1.09206.3432 1.28229.67095 2.11341 2.30045 2.92108 3.738 3.633a12.59877 12.59877 0 0 1 3.91138 2.91427.99992.99992 0 1 0 1.44835-1.379 19.0902 19.0902 0 0 0 -2.40291-2.12999z"/>
          <path d="m23.17147 41.36982a1.00023 1.00023 0 0 0 -1.76376.94346 11.69453 11.69453 0 0 1 .88429 2.13682 1.00057 1.00057 0 0 0 .9571.712c2.0128-.2781.3679-2.73668-.07763-3.79228z"/>
          <path d="m43.09758 27.36042a.99579.99579 0 0 0 1.69242-.92618l-3.83318-14.44724a1.37159 1.37159 0 1 1 2.65153-.70315l.47495 1.78977c.79438 3.00981 2.74087 10.31955 3.55754 13.40652a1.00241 1.00241 0 0 0 1.93664-.5167c-.816-3.06446-2.7542-10.35992-3.54526-13.3434a1.37214 1.37214 0 0 1 2.65215-.70426l2.40006 9.05033a1.00027 1.00027 0 0 0 1.9337-.5118l-2.401-9.05328a3.38879 3.38879 0 0 0 -5.53385-1.61993 3.35329 3.35329 0 0 0 -6.10628 2.4309 3.34188 3.34188 0 0 0 -3.91395 3.6488 3.3313 3.3313 0 0 0 -3.06288 1.01761 3.33152 3.33152 0 0 0 -3.06289-1.0174 3.37275 3.37275 0 0 0 -3.91407-3.64835 3.377 3.377 0 0 0 -4.99849-3.49335 3.33767 3.33767 0 0 0 -1.10772 1.06169 3.36718 3.36718 0 0 0 -5.53472 1.623l-2.40008 9.05039a1.00023 1.00023 0 0 0 1.93373.51172l2.39907-9.04743a1.37229 1.37229 0 0 1 2.65233.70524c-.74946 2.82609-2.76672 10.41733-3.54448 13.33962a1.00234 1.00234 0 0 0 1.93665.51659c1.087-3.96477 2.97489-11.29768 4.033-15.19718a1.37158 1.37158 0 0 1 2.651.70415l-3.83322 14.44718a1.00054 1.00054 0 0 0 1.93373.51366l3.125-11.77783a1.37152 1.37152 0 0 1 2.64975.70787l-3.81956 14.39639a1.00055 1.00055 0 0 0 1.93374.51366l3.176-11.96948a1.37131 1.37131 0 0 1 2.651.70224l-2.85221 10.76335a6.1071 6.1071 0 0 0 .82622 4.89778 14.74608 14.74608 0 0 1 1.25126 12.9149l-1.18289 4.63218a.99994.99994 0 0 0 1.93763.4941l1.16023-4.54375 1.16023 4.54382a.99994.99994 0 0 0 1.93761-.49423l-1.18268-4.63208a.88956.88956 0 0 0 -.03955-.12208 15.14931 15.14931 0 0 1 -.21579-9.49186 13.84936 13.84936 0 0 1 1.50645-3.301 6.11408 6.11408 0 0 0 .84966-4.82258l-2.87621-10.8386a1.37161 1.37161 0 0 1 2.65155-.70213l3.176 11.96947a1.00057 1.00057 0 0 0 1.93369-.51377l-3.81958-14.39639a1.37134 1.37134 0 0 1 2.65093-.70347l3.12386 11.77355a.87777.87777 0 0 0 .24123.41242zm-8.99668 3.57415a4.18442 4.18442 0 0 1 -.65434 3.2258 17.52259 17.52259 0 0 0 -1.44651 2.98231 17.50438 17.50438 0 0 0 -1.44626-2.98231 4.166 4.166 0 0 1 -.63579-3.28737l2.08229-7.84963z"/>
          <path d="m59.10107 21.89c-2.41065-1.83254-5.766 1.10156-6.67428 3.40341-.71453 2.23744-1.34834 4.98627-1.87664 6.8658-.41724 1.29717-1.431 1.80866-2.72131 2.4445a14.18554 14.18554 0 0 0 -4.58917 3.45629 1.00008 1.00008 0 0 0 1.463 1.36334 17.092 17.092 0 0 1 2.25938-2.02352c2.00953-1.43431 4.59438-1.70955 5.51158-4.70346.49879-1.76429 1.14621-4.50241 1.81354-6.66839a4.68279 4.68279 0 0 1 3.11356-2.73063.51943.51943 0 0 1 .41164.12207c.36659.18709.0437 1.41124.08305 1.547a46.29872 46.29872 0 0 1 -1.62368 8.91171c-1.106 4.4124-2.53581 8.87265-5.48082 11.61111-1.83066 1.92983-5.07746 2.90369-4.78739 6.0014l.23 3.34a1.00006 1.00006 0 0 0 1.99524-.13678l-.23048-3.34585a1.96355 1.96355 0 0 1 .89313-1.78821c5.512-3.38058 7.90321-8.96157 9.36761-15.38493a46.86359 46.86359 0 0 0 1.63066-9.05514c.00928-.13575.04884-.55375.09718-1.03815a2.52622 2.52622 0 0 0 -.8858-2.19157z"/>
          <path d="m42.0941 41.10516c-1.539-.62874-1.86642 1.77044-2.30152 2.7706a.99976.99976 0 0 0 .672 1.24431c1.5044.32605 1.39365-1.81018 2.05247-2.66513a1.00057 1.00057 0 0 0 -.42295-1.34978z"/>
        </svg>
      );
    case "selected-dua":
      return (
        <svg width="28" height="28" viewBox="0 0 64 64" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path d="m59.5 36.67139c0-1.76721-.92462-3.3147-2.3092-4.20483 1.08112-.91919 1.78284-2.27313 1.78284-3.802 0-2.31122-1.58484-4.24207-3.71973-4.81049 1.74864-3.61835-1.84409-7.98723-5.74066-6.87153.32903-3.54416-3.57612-6.3151-6.82274-4.887-.47559-3.36991-4.70528-5.30028-7.5502-3.35529-.92701-3.79655-6.07124-5.02132-8.57405-1.96001-2.46277-3.02425-7.58277-1.86059-8.5418 1.90693-3.18939-1.71857-7.34709.80464-7.25679 4.45063.15642 1.07087-.02229.59626-.83122.63613-4.61344-.05067-6.76257 5.96702-3.17775 8.82743-4.41907 2.8989-1.80229 9.93715 3.51065 9.11406-.23922 2.84548 2.13062 5.30721 4.96257 5.29434 1.41139 0 2.6816-.59564 3.59041-1.54253 1.23634 2.58684 4.94838 3.53986 7.27921 1.7503.81136 2.02269 3.04559 3.40199 5.30894 3.03319-.49854 2.96114 1.94122 5.72528 4.92155 5.6975.71362.00002 1.38947-.15635 2.00403-.42783.28748 2.48633 2.37708 4.42981 4.93445 4.42981 1.32666 0 2.52655-.52954 3.42151-1.37817.15198 2.05981.18182 4.72345-.32385 7.07397-.40015 1.64485.9655 3.36647 2.66312 3.32223-.00003.00004 1.51852.00004 1.51852.00004 1.75345.04642 3.15485-1.78484 2.63374-3.46586-.50838-1.82144-1.40358-4.62088-2.67103-7.22024.19061.02258.38.05084.57538.05084 3.43909.0678 5.95465-3.6513 4.64153-6.8291 2.16084-.54974 3.77058-2.49884 3.77058-4.83252zm-2.52637-8.00684c-.10426 3.96006-5.88021 3.97029-5.9834-.00009 0-.72702.26532-1.40183.72919-1.94241.80017-.16718 1.51642-.54285 2.12653-1.04431 1.69359-.09953 3.13285 1.29709 3.12769 2.98682zm-3.28223-6.83789c-.10405 3.95842-5.8809 3.95764-5.98437-.00009.10392-3.95902 5.88103-3.95823 5.98437.00009zm-6.15137-5.10889c-.1045 3.96034-5.88017 3.9701-5.9834-.00009-.02575-.84266.75889-1.33146.93362-2.1457 1.77227-1.85817 5.13163-.41539 5.04977 2.14579zm-9.75391-6.75537c3.94516.10389 3.94486 5.90097-.00009 6.00439-3.94436-.10366-3.94308-5.90144.00009-6.00439zm-7.44043-2.93066c3.9321.10388 3.94241 5.90099-.00009 6.0039-1.18924 0-2.24527-.6991-2.71951-1.7583.10266-.39905.17419-.81.17419-1.24072 0-.42999-.07129-.84033-.17358-1.23871.47302-1.06366 1.52911-1.76617 2.71899-1.76617zm-7.53711.00293c3.94479.10385 3.944 5.90064-.00009 6.00391-3.94539-.10372-3.9446-5.90077.00009-6.00391zm-7.04395 3.10645c.8277 0 1.59991.35309 2.16913.95319.14453.66882.42554 1.28406.80817 1.82434.13539 1.72912-1.25491 3.23359-2.9773 3.22637-3.94645-.10392-3.95672-5.90101 0-6.0039zm-5.82812 5.63281c3.94506.10383 3.94377 5.90126-.00009 6.00439-3.94515-.10359-3.94486-5.90127.00009-6.00439zm-.4502 14.00635c-3.94215-.10305-3.93232-5.9002.00009-6.00342 2.15483-.0512 3.68707 2.3928 2.68809 4.30558-.45356.35561-.84736.77864-1.15596 1.26821-.46857.27679-.99286.42963-1.53223.42963zm5.74561 5.22949c-3.94524-.10359-3.94495-5.90127.00009-6.00439 3.94496.10383 3.94368 5.90126-.00009 6.00439zm7.98291 1.13965c-3.94229-.10314-3.93217-5.9004.00009-6.00391 1.65274 0 2.99698 1.34912 2.99698 3.00732-.19094.47187-.36739.96338-.42863 1.52589-.54427.90551-1.51192 1.4707-2.56844 1.4707zm9.39795 1.47949c-1.84912 1.61397-4.96601.15188-4.89252-2.31893-.04603-1.80116 1.73184-3.30939 3.48825-2.95252.53903.11569 1.07223-.22561 1.18893-.76614.16832-2.16649-3.59197-1.17373-4.5678-.3505-1.20797-3.2442-5.87587-4.16908-8.20114-1.55138-.83756-1.58774-2.48326-2.68405-4.39659-2.68405-.32809-.06328-.89114.29763-.74849-.22165-.00004-1.54416-.71617-2.90988-1.81639-3.82907 1.54357-.99632 2.5413-2.97293 2.18816-4.90181 2.53339.52573 5.05914-1.17423 5.69335-3.58143 1.94266 1.10082 4.65716.50826 6.01844-1.17925 1.47734 1.83093 4.45632 2.30267 6.41916.96813.66908 2.78434 3.96576 4.51395 6.65928 3.33839.41706 2.34096 2.44886 4.12642 4.89753 4.12642.46272.10143 1.36786-.41371 1.16401.10149.00005 2.31294 1.58245 4.24525 3.71398 4.81502-.27765.62836-.43073 1.31146-.43073 2.02295 0 1.76892.92371 3.31781 2.3064 4.2088-1.07996.91833-1.78101 2.27087-1.78101 3.79803 0 .64539.13251 1.25806.35559 1.82495-1.46686.3703-2.672 1.38245-3.30078 2.72729-1.33798-1.26482-3.59915-1.66127-5.30397-.84992-.28747-2.48638-2.37706-4.42987-4.93444-4.42987-.23718 0-.46411.03796-.69257.07019.11597-.69574.05857-1.48632-.14533-2.12488-.41624-1.2498-2.28156-.65665-1.90819.6016.34451 1.10792-.08501 2.41025-.97316 3.13815zm.72705 3.31689c.12131-3.9456 5.87559-3.96468 5.98437.00009-.10403 3.95878-5.88083 3.95851-5.98437-.00009zm9.93066 7.00439c-3.945-.10383-3.94495-5.90091.00009-6.00439 3.95542.11581 3.93191 5.90666-.00009 6.00439zm7.86523 8.72754c-.28277.47351-1.39171.23828-2.1045.29056-.2998-.00003-.47949-.16703-.55956-.26664-.14355-.17676-.19727-.4082-.14844-.63525.49414-2.29639.53027-4.80566.41797-6.87598 1.18457 2.43799 2.03125 5.11279 2.5166 6.84961.08496.3042-.04004.53027-.12207.6377zm-.04785-10.34473c-3.9511-.13555-3.96684-5.87621.00007-6.00391.69621.5489 1.47538 1.07336 2.40975 1.24074 1.45166 1.88361-.03172 4.82924-2.40982 4.76317zm3.41992-6.65967c-3.94566-.10401-3.94437-5.90109.00009-6.00439 3.94507.10389 3.94477 5.90097-.00009 6.00439z"/>
        </svg>
      );
    case "dhikr-after-salah":
      return (
        <svg width="28" height="28" viewBox="0 0 48 48" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path d="m35.51 36.59-6.91-2.66a3 3 0 0 1 -1.9-2.41c3.63-.81 6.05-2.33 9-4.56 3.37-2.52 1.67-7.77-.16-6.85-4.85 2.42-2.64 1.75-9.93 2.79-.29-2.36-.32-4.67-2.84-6.69l.52-1.91.67.1a3 3 0 0 0 3.2-2.4c.39-1.93.89-2.15 1.15-3.46a8.8 8.8 0 0 0 -.58-4.94l-.48-.8c-3.31-5.52-11.78-2.24-10.56 4.07a8.36 8.36 0 0 1 .31 3 2 2 0 0 0 .82 1.63c-.92 3.45-.33 2.29-1.66 2.85a4.06 4.06 0 0 0 -2.24 2.4 15 15 0 0 0 -.92 5.19c0 16.27-.37 16.29 1.09 18.13-5.62.68-7.87 7.93-3.91 7.93h25.82a4 4 0 0 0 4-4v-.88a7 7 0 0 0 -4.49-6.53zm-1-11.23c-.21.17 0 .43-1.17-1.91l2.2-1.1a2.81 2.81 0 0 1 -1.03 3.01zm-8.4-16.49c-1.15 2.29-.66 3.66-1.95 3.54a8.83 8.83 0 0 1 -5.16-2.52v-.89l7.31-3.25a5.51 5.51 0 0 1 -.2 3.12zm-.58-5.06c.06.1.54-.17-6.79 3.09a5 5 0 0 1 -.16-1.16 3.75 3.75 0 0 1 6.95-1.93zm-4.16 9.94-.37 1.41-1.64-.74c-.28-.13-.3.26.19-1.59a11.19 11.19 0 0 0 1.82.92zm-11.19 32.25a4.77 4.77 0 0 1 4.82-4v4zm27.82-2a2 2 0 0 1 -2 2h-19v-4h10a1 1 0 0 0 0-2h-9a3 3 0 0 1 -3-3c0-12.65-.64-19.7 1.93-20.78.92-.39 1.28-.12 3.55.9 4.66 2.1 1.93 7.88 4.27 7.88.44 0-.39.1 6.68-.91l1.28 2.57a17.53 17.53 0 0 1 -10.24 3.34 3 3 0 0 1 -3-2.57l-.47-3.57a1 1 0 0 0 -2 .28l.51 3.57a5 5 0 0 0 4.96 4.29 19.06 19.06 0 0 0 2.26-.15 5 5 0 0 0 3.15 3.94l6.91 2.66a5 5 0 0 1 3.21 4.67z"/>
        </svg>
      );
    default: return null;
  }
}

/* ── Gear Icon ──────────────────────────────────────────────────────────── */
function GearIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      style={{
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: spinning ? "rotate(90deg)" : "rotate(0deg)",
      }}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/* ── Settings Popup ─────────────────────────────────────────────────────── */
function SettingsPopup({ onClose, onTentang, onBahasa }: {
  onClose: () => void;
  onTentang: () => void;
  onBahasa: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-full right-0 mb-2 z-50 settings-popup-enter" style={{ minWidth: "200px" }}>
        <div className="rounded-2xl overflow-hidden" style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
        }}>
          <button onClick={onTentang} className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--bg-card-alt)] active:bg-[var(--bg-card-alt)]" style={{ borderBottom: "1px solid var(--border-color)" }}>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--bg-card-alt)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>
            <span className="text-sm font-medium" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text-primary)" }}>Tentang</span>
            <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <button onClick={onBahasa} className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--bg-card-alt)] active:bg-[var(--bg-card-alt)]">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--bg-card-alt)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8l6 6" /><path d="M4 14s1-1 2-1 2 1 3 1 2-1 3-1 2 1 2 1" /><path d="M12 3v3" /><rect x="2" y="2" width="10" height="8" rx="2" /><path d="M22 22l-5-10-5 10" /><path d="M14.5 18h5" />
              </svg>
            </span>
            <span className="text-sm font-medium" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text-primary)" }}>Bahasa</span>
            <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div className="absolute right-5 bottom-0 translate-y-full" style={{ width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid var(--bg-card)", filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.06))" }} />
      </div>
    </>
  );
}

/* ── Coming Soon Sheet ──────────────────────────────────────────────────── */
function ComingSoonSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-40" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-sheet-up" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="rounded-t-2xl p-6 pb-10" style={{ backgroundColor: "var(--bg-card)" }}>
          <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: "var(--border-color)" }} />
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--bg-card-alt)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h2 className="text-xl text-center mb-2" style={{ fontFamily: "Newsreader, Georgia, serif", color: "var(--text-primary)", fontWeight: 600 }}>Segera Hadir</h2>
          <p className="text-sm text-center mb-8" style={{ fontFamily: "Manrope, sans-serif", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Pengaturan bahasa sedang dalam pengembangan.<br />Nantikan pembaruan berikutnya.
          </p>
          <button onClick={onClose} className="w-full py-3.5 rounded-xl font-semibold text-sm transition-opacity active:opacity-80" style={{ backgroundColor: "var(--primary-green)", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}>
            Mengerti
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Taglines ───────────────────────────────────────────────────────────── */
const TAGLINES = [
  "Dunia begitu bising, temukan tenangmu dalam setiap helaan dzikir.",
  "Jangan biarkan hatimu sepi, saat Allah selalu menunggumu kembali.",
  "Di mana pun kakimu berpijak, pastikan hatimu tetap terpaut pada-Nya.",
  "Awali harimu dengan mengingat Allah.",
];

/* ── Main Component ─────────────────────────────────────────────────────── */
export default function LandingScreen() {
  const isMorning = isMorningTime();
  const router = useRouter();

  // Tagline — stable SSR default, randomized after hydration
  const [tagline, setTagline] = useState(TAGLINES[TAGLINES.length - 1]);
  useEffect(() => { setTagline(TAGLINES[Math.floor(Math.random() * TAGLINES.length)]); }, []);

  // Settings & sheet state
  const [gearSpinning, setGearSpinning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const spinTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleGearClick() {
    setGearSpinning(true);
    if (spinTimeout.current) clearTimeout(spinTimeout.current);
    spinTimeout.current = setTimeout(() => setGearSpinning(false), 520);
    setShowSettings((prev) => !prev);
  }
  function handleTentang() { setShowSettings(false); router.push("/credits"); }
  function handleBahasa() { setShowSettings(false); setShowComingSoon(true); }
  useEffect(() => () => { if (spinTimeout.current) clearTimeout(spinTimeout.current); }, []);

  // ── Carousel state ───────────────────────────────────────────────────────
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(isMorning ? 0 : 1);

  // Scroll active card into view on mount
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const initialIndex = isMorning ? 0 : 1;
    // Give DOM time to paint before scrolling
    requestAnimationFrame(() => {
      const card = el.children[initialIndex] as HTMLElement;
      if (card) el.scrollLeft = card.offsetLeft - (el.offsetWidth - card.offsetWidth) / 2;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update dot indicator on scroll
  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const gap = 12;
    const scrollLeft = el.scrollLeft;
    const idx = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(idx, CATEGORIES.length - 1)));
  }, []);

  function scrollToIndex(i: number) {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft - (el.offsetWidth - card.offsetWidth) / 2, behavior: "smooth" });
    setActiveIndex(i);
  }

  return (
    <>
      <div className="relative min-h-dvh flex flex-col justify-end overflow-hidden">
        {/* Mosque Background */}
        <div className="absolute inset-0">
          <Image src="/mosque-bg.png" alt="Mosque interior" fill className="object-cover" priority quality={85} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>

        {/* Dzkrr logo lockup */}
        <div
          className="absolute top-[25%] left-0 z-10 px-6 flex items-center gap-4"
          style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.35))" }}
        >
          {/* Flower icon */}
          <Image
            src="/flower.svg"
            alt="Dzkrr Logo"
            width={52}
            height={52}
            className="brightness-0 invert opacity-90"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-0">
            <span style={{ fontFamily: "var(--font-newsreader), Newsreader, Georgia, serif", fontSize: "42px", fontWeight: 700, color: "#ffffff", lineHeight: 1, letterSpacing: "-0.02em" }}>
              Dzkrr
            </span>
            <p style={{ fontFamily: "var(--font-manrope), Manrope, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(255,255,255,0.60)", letterSpacing: "0.01em", lineHeight: 1.3 }}>
              Close to your God, anywhere.
            </p>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="relative z-10">
          <div
            className="backdrop-blur-sm pt-6"
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "28px 28px 0 0",
              paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {/* Heading + tagline */}
            <div className="px-6 mb-5">
              <h1
                className="text-2xl font-bold leading-tight mb-2"
                style={{ color: "var(--text-primary)", fontFamily: "Manrope, sans-serif" }}
              >
                Mudah baca dzikir<br />dimana saja
              </h1>
              <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "Manrope, sans-serif" }}>{tagline}</p>
            </div>

            {/* ── Swipeable Category Carousel ── */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
                scrollbarWidth: "none",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingBottom: "4px",
              }}
              className="hide-scrollbar"
            >
              {CATEGORIES.map((cat) => {
                const isTimeRelevant =
                  (cat.timeHint === "morning" && isMorning) ||
                  (cat.timeHint === "evening" && !isMorning);
                const iconColor = isTimeRelevant ? "var(--on-primary-container, #c2e4b4)" : ICON_ACCENTS[cat.slug];

                return (
                  <button
                    key={cat.slug}
                    id={`category-card-${cat.slug}`}
                    onClick={() => router.push(`/dzikir/${cat.slug}`)}
                    aria-label={`Buka ${cat.name}`}
                    style={{
                      flex: "0 0 calc(75vw)",
                      maxWidth: "260px",
                      scrollSnapAlign: "center",
                      borderRadius: "var(--radius-xl, 1.5rem)",
                      padding: "20px",
                      /* active → primary-container; inactive → surface-container-low */
                      backgroundColor: isTimeRelevant
                        ? "var(--primary-green-light, #4a6741)"
                        : "var(--bg-card-alt, #f4f3f1)",
                      border: isTimeRelevant
                        ? "1px solid transparent"
                        : "1px solid var(--border-color, #c3c8bd)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "transform 0.18s ease",
                      WebkitTapHighlightColor: "transparent",
                      boxShadow: isTimeRelevant
                        ? "0px 4px 20px rgba(0,0,0,0.08)"
                        : "0px 4px 20px var(--shadow-color, rgba(0,0,0,0.04))",
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                    onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    {/* Icon + time badge row */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "var(--radius-md, 0.75rem)",
                          backgroundColor: isTimeRelevant
                            ? "rgba(255,255,255,0.18)"
                            : "var(--primary-green-surface, #caecbc)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CategoryIcon slug={cat.slug} color={iconColor} />
                      </div>
                      {isTimeRelevant && (
                        /* chip label-caps style per DESIGN.md */
                        <span style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          color: "var(--on-primary-container, #c2e4b4)",
                          backgroundColor: "rgba(255,255,255,0.18)",
                          borderRadius: "var(--radius-full, 9999px)",
                          padding: "4px 10px",
                        }}>
                          SEKARANG
                        </span>
                      )}
                    </div>

                    {/* Category name — Newsreader per typography spec */}
                    <h2 style={{
                      fontFamily: "Newsreader, Georgia, serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: isTimeRelevant
                        ? "var(--on-primary-container, #c2e4b4)"
                        : "var(--text-primary, #1a1c1a)",
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}>
                      {cat.name}
                    </h2>

                    {/* Arabic subtitle — Newsreader, right-aligned */}
                    <p style={{
                      fontFamily: "Newsreader, Georgia, serif",
                      fontSize: "13px",
                      color: isTimeRelevant
                        ? "rgba(194,228,180,0.70)"
                        : "var(--text-muted, #73796f)",
                      direction: "rtl",
                      marginBottom: 16,
                      lineHeight: 1.5,
                    }}>
                      {cat.arabic}
                    </p>

                    {/* Count chip — chip-tertiary style */}
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                      color: isTimeRelevant
                        ? "var(--on-primary-container, #c2e4b4)"
                        : "var(--primary-green, #334f2b)",
                      backgroundColor: isTimeRelevant
                        ? "rgba(255,255,255,0.15)"
                        : "var(--primary-green-surface, #caecbc)",
                      borderRadius: "var(--radius-full, 9999px)",
                      padding: "4px 12px",
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M9 18 L15 12 L9 6" />
                      </svg>
                      {cat.count} {cat.slug.includes("dua") ? "doa" : "dzikir"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-3 mb-1 px-6">
              {CATEGORIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    borderRadius: "var(--radius-full, 9999px)",
                    backgroundColor: i === activeIndex
                      ? "var(--primary-green, #334f2b)"
                      : "var(--border-color, #c3c8bd)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.25s ease, background-color 0.25s ease",
                    WebkitTapHighlightColor: "transparent",
                  }}
                />
              ))}
            </div>

            {/* Settings gear */}
            <div className="mt-3 px-6 flex justify-end">
              <div className="relative">
                <button
                  id="settings-gear-btn"
                  onClick={handleGearClick}
                  aria-label="Pengaturan"
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
                  style={{
                    backgroundColor: showSettings ? "var(--primary-green-surface)" : "#f4f3f1",
                    color: showSettings ? "var(--primary-green)" : "#73796f",
                    border: "1px solid #e3e2e0",
                  }}
                >
                  <GearIcon spinning={gearSpinning} />
                </button>
                {showSettings && (
                  <SettingsPopup
                    onClose={() => setShowSettings(false)}
                    onTentang={handleTentang}
                    onBahasa={handleBahasa}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Sheet */}
      {showComingSoon && <ComingSoonSheet onClose={() => setShowComingSoon(false)} />}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes popupEnter {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        .settings-popup-enter {
          animation: popupEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .animate-sheet-up {
          animation: sheetUp 0.28s cubic-bezier(0.32, 0.72, 0, 1) both;
        }
      `}</style>
    </>
  );
}
