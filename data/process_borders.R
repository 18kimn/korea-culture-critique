library(tidyverse)
library(sf)
library(rmapshaper)

# aggregates .shp files into a single geojson file
# renames columns to easy-to-type names
process_borders <- function() {
  dta <- c("data/raw/gadm36_KOR_2_sf.rds", "data/raw/gadm36_PRK_2_sf.rds") %>%
    map_dfr(\(file) {
      shp <- readRDS(file)
      st_crs(shp) <-
        st_crs(shp) # handle "old-style" projection warnings
      return(shp)
    }) %>%
    ms_simplify(keep = 0.01)
  
  polygons <- dta |> 
    group_by(1:n()) |> 
    group_split() |> 
    map_dfr(\(row){
      tibble(geometry = st_cast(row$geometry, "POLYGON"))
    }) |> 
    slice_sample(prop = 1)
  
  write_sf(polygons, "data/raw/borders.json", driver = "GeoJSON", delete_dsn = TRUE)
  
  # Favicon
  korea_plot <- ggplot(dta) + 
    geom_sf(fill = "#0085ca", color = NA) + 
    theme_void() 
    
  ggsave("static/favicon.png", plot = korea_plot, width = 192, height = 192, units = "px",
         bg = "transparent")
}

process_borders()
