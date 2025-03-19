import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Developer",
    "Data Science",
    "Machine Learning",
    "Crypto"
]
function CategoryCarousel() {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-5">
                <CarouselContent >
                    {
                        category.map((cat) => (
                            <CarouselItem className="md:basis-1/3 lg-basis-1/3">
                                <Button variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel