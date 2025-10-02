import { Dot } from "lucide-react";

const Footer = () =>{

 const footerLinks = [
  { id: 1, item: "Terms of Service", link: "/terms" },
  { id: 2, item: "Privacy Policy", link: "/privacy" },
  { id: 3, item: "Cookie Policy", link: "/cookies" },
  { id: 4, item: "Accessibility", link: "/accessibility" },
  { id: 5, item: "Ads Information", link: "/ads-info" },
  { id: 6, item: "Help Center", link: "/help" },
  { id: 7, item: "About", link: "/about" },
  { id: 8, item: "Careers", link: "/careers" },
  { id: 9, item: "Developers", link: "/developers" },
  { id: 10, item: "Brand Resources", link: "/brand" },
  { id: 11, item: "Directory", link: "/directory" },
  { id: 12, item: "Settings", link: "/settings" }
]


return (
    <div className="text-sm flex flex-wrap gap-2">
        {footerLinks.map((item) =>(
            <div key={item.id} className="flex footer-text cursor-pointer">
                <Dot/>
                <p>{item.item}</p>
            </div>
        ))}
    </div>
)
}

export default Footer;