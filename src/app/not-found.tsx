
import { FaHome } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Center404 from "../../public/assets/img/404_center.png";
import Left404 from "../../public/assets/img/404_left.png";
import Right404 from "../../public/assets/img/404_right.png";
import "./not-found.scss";

function NotFoundPage() {
  return (
    <div className="b-page__wrap">
      <div className="image-wrapper">
        <div className="image-img">
          <Image src={Center404} alt="" />
          <div className="image-img_left">
            <Image src={Left404} alt="" />
          </div>

          <div className="image-img_right">
            <Image src={Right404} alt="" />
          </div>
        </div>

        <div className="unsearched-wrapper">
          <div className="unsearched-header">Страница не найдена!</div>
          <div className="unsearched-text">
            Страница, которую вы ищете, не существует или временно недоступна
          </div>

          <Link href={"/"}>
            <Button>
              <FaHome /> <span className="ml-2">Главная</span>{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
